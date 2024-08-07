"use client";

import React, { useEffect, useState } from 'react';

const Natiga = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/proxyNatiga', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ seating_no: '856541' }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const textData = await response.text();
        setData(textData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>نتيجة البحث</h1>
      {error ? (
        <p>حدث خطأ: {error}</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: data }} />
      )}
    </div>
  );
};

export default Natiga;
