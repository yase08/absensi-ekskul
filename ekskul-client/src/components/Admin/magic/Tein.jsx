import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AiOutlineClose} from 'react-icons/ai'


// eslint-disable-next-line react/prop-types
const Tein = ({toggleOpenHelpNav, setLoading, loading}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
  

    const getMachineLearningSuggestions = async (query) => {
        const suggestions = ['rombel', 'rayon', 'ekstrakulikuler', 'jadwal','program','siswa','gallery', 'ruangan','instruktur'];
        return suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        );
      };
    
      const handleInputChange = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    
        const suggestions = await getMachineLearningSuggestions(query);
        setSuggestions(suggestions);
      };
    
      const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
      };
    
      const handleButtonClick = async () => {
        setLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate(`/admin/${searchQuery}`);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };
  return (
    <div className="bg-transparent w-full h-full justify-center items-center flex z-50 fixed" style={{ backdropFilter: 'blur(5px)' }}>
    <div className="text-black bg-white border p-3 border-gray-400 w-[400px] h-auto ">
        <div className=" relative">
            <div className="text-white">-</div>
            <button onClick={toggleOpenHelpNav} className="absolute right-0 top-0 "><AiOutlineClose/></button>
        </div>
        <div className="flex flex-col gap-[1px]">
        <input
      type="text"
      className="outline-none border p-1 rounded-sm border-gray-400 w-full"
      placeholder="Where Do You Want To Go"
      value={searchQuery}
      onChange={handleInputChange}
    />
    {suggestions.length > 0 && (
      <div className="bg-white border w-full border-gray-400  h-auto">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="cursor-pointer hover:bg-gray-200 p-1 rounded"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    )}
        <button className="bg-blue-500 p-1 w-full text-white rounded-sm" onClick={handleButtonClick}>
        {loading ? <div className="loader"></div> : 'Tein'}
        </button>

        </div>
    </div>
</div>
  )
}

export default Tein
