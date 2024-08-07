"use client";

import React, { useState } from 'react';

const Natiga = () => {
  const [seatingNo, setSeatingNo] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/proxyNatiga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seating_no: seatingNo }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textData = await response.text();
      setData(textData);
      setError('');
    } catch (error) {
      setError(error.message);
      setData('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-4 bg-gray-100 p-4 pt-8">
      <h1 className="text-3xl font-bold my-8">
       الآن نتيجة الثانوية العامة 2024 مع درجات المواد بالتفصيل
        </h1>
      <h1 className="text-xl font-bold mb-4">ادخل رقم جلوسك</h1>
      <form onSubmit={handleSubmit} className="w-[60%] p-6 rounded-lg shadow-lg flex flex-col gap-4">
        <input
          type="text"
          value={seatingNo}
          onChange={(e) => setSeatingNo(e.target.value)}
          placeholder="رقم الجلوس"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button 
        disabled={!seatingNo}
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          عرض النتيجة
        </button>
      </form>

      {loading && <p className="mt-4 text-blue-500">جاري تحميل البيانات...</p>}

      {error ? (
        <p className="mt-4 text-red-500">حدث خطأ: {error}</p>
      ) : (
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: data }} />
      )}
    </div>
  );
};

export default Natiga;
