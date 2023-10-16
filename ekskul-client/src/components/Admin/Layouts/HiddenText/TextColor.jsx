import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

const TextColor = ({ toggleOpenText }) => {
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(false);

  useEffect(() => {
    // Mendapatkan nilai dari localStorage saat komponen dimount
    const storedTopColor = localStorage.getItem('topColor');
    const storedSideColor = localStorage.getItem('sideColor');
    const storedFooterColor = localStorage.getItem('footerColor');

    setEnabled(storedTopColor === '#000000');
    setEnabled1(storedSideColor === '#000000');
    setEnabled2(storedFooterColor === '#000000');
  }, []);

  const handleToggle = (page, isEnabled) => {
    const color = isEnabled ? '#000000' : '#FFFFFF';
    const status = isEnabled ? 'on' : 'off';
    localStorage.setItem(`${page}Color`, color);
    localStorage.setItem(`${page}Status`, status);

    // Mengganti state sesuai page
    switch (page) {
      case 'top':
        setEnabled(isEnabled);
        break;
      case 'side':
        setEnabled1(isEnabled);
        break;
      case 'footer':
        setEnabled2(isEnabled);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    window.location.reload();
  };

    return (
        <div className='flex '>
            <div className='w-[100%] p-3 '>
                <div className='flex flex-col w-full h-full '>
                    <button className='text-center' onClick={toggleOpenText}>Text Color</button>
                    <div className=''>
                        <table className="min-w-full mt-7 flex flex-col">
                            <thead className='mb-2'>
                                <tr className='flex justify-between px-6 mb-3 '>
                                    <th className='font-normal'>
                                        Page
                                    </th>
                                    <th className='font-normal'>
                                        Light / Black
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=' max-h-[500px] overflow-y-scroll hidden-scroll'>
                                <tr className='flex justify-between  border-b border-gray-200'>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        Top
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap ">
                                        <Switch
                                            checked={enabled}
                                            onChange={() => handleToggle('top', !enabled)}
                                            className={`${
                                                enabled ? 'bg-blue-600' : 'bg-gray-200'
                                            } relative inline-flex h-[27px] w-12 items-center rounded-full`}
                                        >
                                            <span
                                                className={`${
                                                    enabled ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                                            />
                                        </Switch>
                                    </td>
                                </tr>
                                <tr className='flex justify-between  border-b border-gray-200'>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        Side
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap ">
                                        <Switch
                                            checked={enabled1}
                                            onChange={() => handleToggle('side', !enabled1)}
                                            className={`${
                                                enabled1 ? 'bg-blue-600' : 'bg-gray-200'
                                            } relative inline-flex h-[27px] w-12 items-center rounded-full`}
                                        >
                                            <span
                                                className={`${
                                                    enabled1 ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                                            />
                                        </Switch>
                                    </td>
                                </tr>
                                <tr className='flex justify-between  border-b border-gray-200'>
                                    <td className="px-6 py-4 whitespace-no-wrap">
                                        Footer
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap ">
                                        <Switch
                                            checked={enabled2}
                                            onChange={() => handleToggle('footer', !enabled2)}
                                            className={`${
                                                enabled2 ? 'bg-blue-600' : 'bg-gray-200'
                                            } relative inline-flex h-[27px] w-12 items-center rounded-full`}
                                        >
                                            <span
                                                className={`${
                                                    enabled2 ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block h-5 w-5 transform rounded-full bg-white transition`}
                                            />
                                        </Switch>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='bg-primary text-white w-full mt-4 p-2 rounded-md' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextColor
