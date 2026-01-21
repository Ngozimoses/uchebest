import { useParams, useNavigate } from 'react-router-dom';

const mockBeansData = [
  { id: '1', name: 'Honey Beans', description: 'Sweet and nutritious Nigerian delicacy.', image: 'https://via.placeholder.com/400x300?text=Honey+Beans', preparation: 'Soak overnight. Boil until soft. Add palm oil, pepper, and seasonings.' },
  { id: '2', name: 'Black-eyed Peas', description: 'Protein-rich legume for stews and salads.', image: 'https://via.placeholder.com/400x300?text=Black-eyed', preparation: 'Rinse well. Cook for 45 mins with onion and bay leaf.' },
];

export default function BeansDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bean = mockBeansData.find(b => b.id === id);

  if (!bean) {
    return <div className="container mx-auto px-4 py-8 text-center">Beans not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/beans')} 
        className="mb-6 text-purple-600 hover:text-purple-800 flex items-center"
      >
        ← Back to Beans Gallery
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
        <img 
          src={bean.image} 
          alt={bean.name} 
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{bean.name}</h1>
          <p className="text-gray-700 mb-6">{bean.description}</p>
          
          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">How to Prepare</h2>
            <p className="text-gray-700 whitespace-pre-line">{bean.preparation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}