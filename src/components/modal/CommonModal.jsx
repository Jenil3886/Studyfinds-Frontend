export const CommonModal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-md shadow-lg max-w-xl w-full">
				<button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};
