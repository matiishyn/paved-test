import dynamic from 'next/dynamic';

const CustomCssModalDynamic = dynamic(() => import('./CustomCssModal'), {
  ssr: false
});

export default CustomCssModalDynamic;
