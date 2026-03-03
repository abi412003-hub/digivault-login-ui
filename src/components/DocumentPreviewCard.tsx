const DocumentPreviewCard = () => (
  <div className="mx-4 mt-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center justify-center min-h-[300px]">
    <div className="w-full h-[280px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=500&fit=crop"
        alt="Document preview"
        className="w-full h-full object-cover opacity-80 grayscale"
      />
    </div>
  </div>
);

export default DocumentPreviewCard;
