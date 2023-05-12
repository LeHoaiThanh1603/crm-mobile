import React, { useEffect, useState } from 'react'
import { Avatar, Button, Image, List, Rate, Skeleton, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import './index.css'
import { GetListRating } from '@/untils/request';
import moment from 'moment';
import { RatingRefect } from '@/slices/RatingSlice';

export default function ListRating() {
    const [dataRating, setDataRating] = useState([])
    const [loading, setLoading] = useState(false);
    const [countAll, setCountAll] = useState(0);
    const [valueFilter, setValueFilter] = useState(0);
    const [count5Star, setCount5Star] = useState(0);
    const [count4Star, setCount4Star] = useState(0);
    const [count3Star, setCount3Star] = useState(0);
    const [count2Star, setCount2Star] = useState(0);
    const [count1Star, setCount1Star] = useState(0);
    const [bage, setBage] = useState([]);
    // const dataRatingRefect = useSelector(RatingRefect)
    console.log(dataRating)

    // const onChange = (checked) => {
    //     setLoading(!checked);
    // };
    useEffect(() => {
        setLoading(true)

        GetListRating().then(res => {
            setLoading(true)
            setBage(res.data)
            switch (valueFilter) {
                case 5:
                    setDataRating(res.data.filter((item) => item.star === 5))
                    break;
                case 4:
                    setDataRating(res.data.filter((item) => item.star === 4))

                    break;
                case 3:
                    setDataRating(res.data.filter((item) => item.star === 3))

                    break;
                case 2:
                    setDataRating(res.data.filter((item) => item.star === 2))

                    break;
                case 1:
                    setDataRating(res.data.filter((item) => item.star === 1))

                    break;
                case 0:
                    setDataRating(res.data)

            }
            setLoading(false)
        }
        )
    }, [valueFilter])

    useEffect(() => {
        // Calculate counts

        setCountAll(bage.length);
        setCount5Star(bage.filter((item) => item.star === 5).length);
        setCount4Star(bage.filter((item) => item.star === 4).length);
        setCount3Star(bage.filter((item) => item.star === 3).length);
        setCount2Star(bage.filter((item) => item.star === 2).length);
        setCount1Star(bage.filter((item) => item.star === 1).length);
    }, [bage]);


    const RATEDATA = dataRating.map((rate, i) => ({
        // href: 'https://ant.design',
        title: rate.guestName === '' ? 'Tên đã ẩn' : rate.guestName,
        images: rate.images,
        infoRoom: rate.room,
        BookingID: rate.bookingId,
        createDate: rate.createDate,
        star:
            <Rate disabled value={rate.star} />,
        content: rate.description,
    }));
    // const IconText = ({ icon, text }) => (
    //     <Space>
    //         {React.createElement(icon)}
    //         {text}
    //     </Space>
    // );
    const handleFilterStar = value => {
        switch (value) {
            case "all":
                setValueFilter(0);
                break;
            case "5":
                setValueFilter(5);
                break;
            case "4":
                setValueFilter(4);
                break;
            case "3":
                setValueFilter(3);
                break;
            case "2":
                setValueFilter(2);
                break;
            case "1":
                setValueFilter(1);
                break;
            default:
                setValueFilter("Không có giá trị");
        }
    }

    const controlStar = () => {
        let totalStars = 0;
        for (let i = 0; i < bage.length; i++) {
            totalStars += bage[i].star;
        }
        let averageStars = totalStars / (bage.length * 5) * 5;
        return (
            <>
                <div className='feedBackStar'>
                    <span className='rateVote'>{averageStars.toFixed(1)}</span>
                    trên 5
                </div>
                <Rate value={averageStars} allowHalf disabled style={{ fontSize: '30px', gap: '5px' }} />


            </>

        )
    }

    function isVideoUrl(url) {
        // Biểu thức chính quy kiểm tra xem URL có phải là đường dẫn tới một file video MP4 hay không
        const regex = /.*\.(mp4)$/i;

        if (regex.test(url)) {
            // return <video style={{ width: '150px' }} src={url} onClick={() => alert()} />
            <Image control width={100}  >
                <video style={{ width: '150px' }} src={url} />
            </Image>
        }
        return <Image width={100} src={url} />

    }

    return (
        <div className='wrapRating'>
            <h4 style={{ marginBottom: '15px' }}>Đánh giá khách sạn</h4>
            <div className='Header'>
                <div className='feedbackStar-container'>
                    {loading ?
                        <>
                            <Skeleton.Input active size='large'></Skeleton.Input>
                            <Skeleton.Input active style={{ marginTop: '20px' }} size='large'></Skeleton.Input>
                        </>
                        :
                        controlStar()
                    }
                </div>
                {loading ?
                    <Skeleton.Input active block size='large'></Skeleton.Input>
                    :
                    <div className='btn-optionStar'>
                        <Button type={valueFilter === 0 ? 'primary' : 'default'} onClick={() => handleFilterStar('all')}>Tất cả ({countAll}) </Button>
                        <Button type={valueFilter === 5 ? 'primary' : 'default'} onClick={() => handleFilterStar('5')}>5 Sao ({count5Star})</Button>
                        <Button type={valueFilter === 4 ? 'primary' : 'default'} onClick={() => handleFilterStar('4')}>4 Sao ({count4Star}) </Button>
                        <Button type={valueFilter === 3 ? 'primary' : 'default'} onClick={() => handleFilterStar('3')}>3 Sao ({count3Star}) </Button>
                        <Button type={valueFilter === 2 ? 'primary' : 'default'} onClick={() => handleFilterStar('2')}>2 Sao ({count2Star}) </Button>
                        <Button type={valueFilter === 1 ? 'primary' : 'default'} onClick={() => handleFilterStar('1')}>1 Sao ({count1Star}) </Button>
                    </div>
                }
            </div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={RATEDATA}
                // footer={
                //     <div>
                //         <b>ant design</b> footer part
                //     </div>
                // }
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                    // actions={[
                    //     <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    //     <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    //     <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    // ]}

                    >
                        <Skeleton loading={loading} active>

                            <List.Item.Meta
                                // avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={
                                    <>
                                        <div className='reservationInfo'>
                                            <span>Mã Booking: {item.BookingID}</span>
                                            <span>|</span>
                                            <span>Mã Phòng: {item.infoRoom}</span>
                                            <span>|</span>
                                            <span>Đánh giá vào lúc: {moment(item.createDate).format('lll')}</span>
                                        </div>
                                        <div>{item.star}</div>

                                    </>

                                }
                            />
                            {item.content}
                            <div className='Feedback'>
                                {item.images.length > 0 ?
                                    <Image.PreviewGroup>
                                        {item.images.map((url) => (
                                            isVideoUrl(url)
                                        ))}
                                    </Image.PreviewGroup>
                                    :
                                    <div></div>
                                }
                            </div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    )
}
