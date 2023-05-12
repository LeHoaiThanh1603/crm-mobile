
import { Button, Tooltip, Typography } from 'antd';
import VoteStarContent from './VoteStarContent';
import { Rate } from 'antd';
import './index.css'
import { useState } from 'react';
import { TbMoodCrazyHappy } from 'react-icons/tb';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { RiAttachment2 } from 'react-icons/ri';
import { IoMdTrash } from 'react-icons/io';
import { CreateRating } from '@/untils/request';
import { useDispatch, useSelector } from 'react-redux';
import { RatingRefect, RatingRefectAction } from '@/slices/RatingSlice';
const desc = ['terrible', 'bad', 'normal', 'good', <TbMoodCrazyHappy size={30} />];
const VoteStar = () => {
    const [valueStar, setValueStar] = useState(0);
    const [file, setFile] = useState([]);
    const [valueComment, setValueComment] = useState('')
    // const dispatch = useDispatch()
    // const dataRatingRefect = useSelector(RatingRefect)

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFile(file.concat(files));
    };

    const handleDelete = (i) => {
        const newFiles = [...file];
        newFiles.splice(i, 1); // hoặc: newFiles = newFiles.filter((f, index) => index !== i);
        setFile(newFiles);
    }

    const handleComments = e => {
        setValueComment(e.target.value)
    }
    console.log(file)
    const handleSubmit = () => {
        const data = new FormData();
        data.append("BookingId", 2);
        data.append("RoomId", 2);
        data.append("Room", 306);
        data.append("GuestName", 'Khách ');
        data.append("Star", valueStar);
        data.append("Description", valueComment);
        if (file.length > 0) {
            for (let i = 0; i < file.length; i++) {
                const files = file[i];
                data.append("Images", files, files.name);
            }
        }


        CreateRating(data)
        setValueStar(0)
        setValueComment('')
        setFile([])
        // dispatch(RatingRefectAction.handleRefect({
        //     ratingRefect: true
        // }))

    }

    return (
        <div className='vote'>
            <div className='VoteContainer'>
                <div>
                    <div>
                        <Typography.Text style={{ fontSize: '20px' }}>Tên Khách: </Typography.Text>
                        <Typography.Text style={{ fontSize: '20px' }}>Lê Hoài Thanh</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text style={{ fontSize: '20px' }}>Phòng: </Typography.Text>
                        <Typography.Text style={{ fontSize: '20px' }}>304</Typography.Text>
                    </div>
                    <span className='rate'>
                        <Rate onChange={setValueStar} value={valueStar} />
                        {valueStar ? <span className="ant-rate-text">{desc[valueStar - 1]}</span> : ''}
                    </span>
                    <div >
                        <h5>Góp ý:</h5>
                        <div className='action'>
                            <div className='comments'>
                                <textarea onChange={e => handleComments(e)} placeholder='Đóng góp ý kiến về chúng tôi..'></textarea>
                            </div>
                            <div className='previewContainer'>
                                {
                                    file.map((file, i) => {
                                        return (
                                            <div key={i} className='preview'>
                                                <img src={URL.createObjectURL(file)} className='previewfile' alt='File' />
                                                {/* <span className='preview_name'>{file.name}</span> */}
                                                <span className='preview_del' onClick={e => handleDelete(i)}>{<IoMdTrash />}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div>
                                <Tooltip title='Chọn để gửi tệp'>
                                    <div className='action-file'>
                                        <input
                                            className='input-file'
                                            type="file"
                                            id='file'
                                            multiple
                                            hidden
                                            onChange={handleFileChange}
                                        />
                                        <label htmlFor="file" className='fileAttachment'>
                                            {<RiAttachment2 cursor={'pointer'} />}
                                        </label>

                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <Button style={{ float: 'right', marginTop: '20px' }} type="primary" disabled={valueStar === 0 || valueComment === ''} onClick={handleSubmit}>Gửi</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoteStar;