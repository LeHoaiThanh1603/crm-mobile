import { Modal } from "antd";

function ModalTemplate(openModalTemplate, setOpenModalTemplate, valueMethod, dataTemplate1) {
    console.log(dataTemplate1)


    const columnsModule = [
        {
          title: 'STT',
          dataIndex: 'stt',
          key: 'stt',
          width: '10%',
        },
        {
          title: 'Tên Template',
          dataIndex: 'template',
          key: 'template',
          width: '20%',
        },
        {
          title: 'Nội dung',
          dataIndex: 'content',
          key: 'content',
          className: 'templateContent',
          width: '60%',
    
          render: (text) => {
            switch(valueMethod) {
              case 'zalo' : 
                return (
                  <a href={text} target="_blank">
                    Xem nội dung
                  </a>
                );
              case 'sms':
                return <div>{text}</div>
              case 'email' : 
                return handleConvertJSX(text)
            } 
          },
        },
        {
          title: 'Kênh gửi',
          key: 'tags',
          dataIndex: 'tags',
          width: '10%',
          render: (text) => {
            switch (text) {
              case 'zalo':
                return (
                  <span className="iconTags">
                    <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/09/zalo-logo-inkythuatso-14-15-05-01.jpg" />
                  </span>
                );
              case 'email':
                return (
                  <span className="iconTags">
                    <img src="https://icons-for-free.com/download-icon-email+gmail+google+internet+message+icon-1320192780259745073_0.svg" />
                  </span>
                );
              case 'sms':
                return (
                  <span className="iconTags">
                    <img src="https://cdn0.iconfinder.com/data/icons/tuts/256/messages.png" />
                  </span>
                );
            }
          },
        },
      ];

    const dataModule = dataTemplate1.map((item, i) => {
    return {
        stt: i + 1,
        template: item.name,
        content: item.content,
        tags: item.channel,
    };
    });

    return ( 
      <Modal
      className="modelTemplate"
      title="Chọn template"
      open={openModalTemplate}
      onCancel={setOpenModalTemplate(false)}
      okButtonProps={{ style: { display: 'none' } }}
    >
      <div>
        <Table
          className="tableTemplate"
          columns={columnsModule}
          dataSource={dataModule}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {}, // click row
              onDoubleClick: (event) => {
                setPreview(record)
                setDatatemplate(record);
                setOpenn(false);
              }, // double click row
              onContextMenu: (event) => {}, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
        />
      </div>
    </Modal>
     );
}

export default ModalTemplate;