import { useParams, useNavigate } from 'react-router-dom';

// Mock data - replace with real API or context later
const mockRiceData = [
 
  { id: '1', name: 'Ofada Rice', description: 'Traditional Nigerian short-grain rice with earthy aroma.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWcXHdfPHmBkKtn-_-CmmBhMvo8XXMM9l1g&s' },
  { id: '2', name: 'Basmati Rice', description: 'Long-grain aromatic rice perfect for biryanis and pilafs.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTheFqFyuO-U0HID3WD-HlB85HwnA7ZMuO1LQ&s' },
  { id: '3', name: 'Abakaliki Rice', description: 'Premium locally grown white rice from Ebonyi State.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1frLEPcCcQJjxkGocPkQ5KxTatokgQUfCUA&s' },
  { id: '4', name: 'Brown Rice', description: 'Unpolished whole grain rice rich in fiber and nutrients.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwcBTlBJEWG0sItgqiJRJy__y01RZl0ryn3Q&s' },
];

export default function RiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rice = mockRiceData.find(r => r.id === id);

  if (!rice) {
    return <div className="container mx-auto px-4 py-8 text-center">Rice not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/rice')} 
        className="mb-6 text-purple-600 hover:text-purple-800 flex items-center"
      >
        ← Back to Rice Gallery
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
        <img 
          src={rice.image} 
          alt={rice.name} 
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{rice.name}</h1>
          <p className="text-gray-700 mb-6">{rice.description}</p>
          
          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">How to Prepare</h2>
            <p className="text-gray-700 whitespace-pre-line">{rice.preparation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}