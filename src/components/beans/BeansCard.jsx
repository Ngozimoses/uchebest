import { Link } from 'react-router-dom';

export default function BeansCard({ bean }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img 
        src={bean.image || 'https://via.placeholder.com/300x200?text=Beans'} 
        alt={bean.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{bean.name}</h3>
        <p className="text-gray-600 mt-2 line-clamp-2">{bean.description}</p>
        <Link 
          to={`/beans/${bean.id}`} 
          className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}