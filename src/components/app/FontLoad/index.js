import React from 'react';

// Lazy load google font when select
export default function FontLoad({ font }) {
  return (
    <style jsx global>
      {`
        @import url('https://fonts.googleapis.com/css?family=${font.family.replaceAll(
          ' ',
          '+'
        )}:wght@400..800&display=swap');
      `}
    </style>
  );
}
