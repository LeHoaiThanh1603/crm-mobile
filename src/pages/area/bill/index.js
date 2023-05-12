// import React from 'react';
// import { history } from 'umi';
// import './bill.less';
// import AnhTest from './assets/test.png';

// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';

// // import required modules
// import { Navigation } from 'swiper';

// export default function Bill() {
//   if (!history) return;
//   const { query } = history.location;

//   return (
//     <div className="container-bill">
//       <div className="container-left">
//         <div className="container-menu">
//           <div className="menu">
//             <div className="swiper-button-prev"></div>
//             <div className="swiper-button-next"></div>
//             <Swiper
//               slidesPerView={5}
//               spaceBetween={20}
//               slidesPerGroup={5}
//               loop={false}
//               loopFillGroupWithBlank={true}
//               // navigation={true}
//               modules={[Navigation]}
//             >
//               <SwiperSlide className="selected" key={'key'}>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 1</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 2</span>
//               </SwiperSlide>
//               <SwiperSlide className="selected">
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 3</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 4</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 5</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 6</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 7</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 8</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 9</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 10</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 11</span>
//               </SwiperSlide>
//               <SwiperSlide>
//                 <img src={AnhTest}></img>

//                 <span>MENU FOOD 12</span>
//               </SwiperSlide>
//             </Swiper>
//           </div>
//         </div>
//         <div className="product">day la product</div>
//       </div>
//       <div className="container-right">
//         <div className="bill"> day la bill</div>
//       </div>
//     </div>
//   );
// }
