import Modal from "@/components/Popup";
import { useIntl } from 'umi';
import { label } from "@/components/Label";
import { input } from "@/components/Input";
function EditTemplate({ visible, close, data }) {
    console.log(data)
    const intl = useIntl();

    return (
        <Modal
            visible={visible}
            onClose={close}
            size='sm'
            title={intl.formatMessage({ id: 'pages.setting.editTemplateACP.modal.title' })}

        >
            <label.titlexl>
                {intl.formatMessage({
                    id: 'pages.setting.templateName.info',
                })}
            </label.titlexl>
            <input.medium
                required={true}
                // value={data.TemplateINCOM}
            />
            <label.titlexl>
                {intl.formatMessage({
                    id: 'pages.setting.templateName.info',
                })}
            </label.titlexl>
            <input.medium
                required={true}
                // value={data.TemplateINCOM}
            />
        </Modal>
      );
}

export default EditTemplate;