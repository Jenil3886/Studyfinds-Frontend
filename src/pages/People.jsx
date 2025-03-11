import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ProfileCard } from "../components/card/PeopleCard";
import UnfollowModal from "../components/modal/UnfollowModal";
import { apiCall } from "../api/config";

const People = () => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);

	const openUnfollowModal = useCallback(() => setIsUnfollowModalOpen(true), [setIsUnfollowModalOpen]);
	const closeUnfollowModal = () => setIsUnfollowModalOpen(false);

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await apiCall("/users", { headers: { access: !isLoggedIn } });
				console.log(response);
				setUsers(response.data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};

		fetchUsers();
	}, [isLoggedIn]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	return (
		<div className="h-full p-6 bg-gray-50">
			<motion.ul
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
				initial="hidden"
				animate="visible"
				variants={{
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: {
							staggerChildren: 0.15,
						},
					},
				}}
			>
				{users.map((user) => (
					<motion.div
						key={user._id}
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.5 }}
						onClick={openUnfollowModal}
					>
						<ProfileCard user={user} />
					</motion.div>
				))}
			</motion.ul>
			<UnfollowModal isUnfollowModalOpen={isUnfollowModalOpen} closeUnfollowModal={closeUnfollowModal} />
		</div>
	);
};

export default People;
