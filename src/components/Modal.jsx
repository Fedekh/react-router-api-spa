import React, { useState } from 'react';

export default function Moddal({ resourceName, isOpen, onClose, onConfirm }) {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleConfirm = () => {
        setIsConfirming(true);
        onConfirm();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                    </div>
                    <div
                        className="relative bg-slate-600 p-8 rounded-md shadow-lg max-w-md"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="mb-6 text-lg font-semibold">Conferma l'azione</div>
                        <p className=" mb-6">Sei sicuro di voler eliminare  <span className='text-red-600'>{resourceName}</span>?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={onClose}
                                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 ${isConfirming && 'opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                Conferma
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
