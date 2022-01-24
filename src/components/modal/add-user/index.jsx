import { Input, ModalBase, SelectInput } from 'components/molecules';
import { useForm } from 'helpers/hooks';
import { masterDataServices } from 'services/fetch';

import styles from './styles.module.scss';

const { form_container } = styles;

const AddUserModal = (props) => {
  const { isOpen = false, onClose = () => {}, revalidate = () => {} } = props;
  const { state, handleStateSchange, resetFields } = useForm({
    username: '',
    nip: '',
    email: '',
    role: '',
  });

  const _handleSubmit = async (payload) => {
    try {
      const response = await masterDataServices.user.create(payload);
      console.log(response, 'res add user');
      revalidate();
      resetFields();
      onClose();
    } catch (err) {
      console.log(err, 'err add user');
    }
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Add User"
      okText="Add User"
      onOk={() => _handleSubmit(state)}
    >
      <div className={form_container}>
        <Input
          type="text"
          label="Username"
          placeholder="Enter username"
          name="username"
          value={state.username}
          onChange={(v) => handleStateSchange('username', v)}
        />
        <Input
          type="text"
          label="NIP"
          placeholder="Enter NIP"
          name="nip"
          value={state.nip}
          onChange={(v) => handleStateSchange('nip', v)}
        />
        <Input
          type="email"
          label="Email address"
          placeholder="Enter email address"
          name="email"
          value={state.email}
          onChange={(v) => handleStateSchange('email', v)}
        />

        <SelectInput
          label="Select Role"
          placeholder="Select role"
          selections={[
            { label: 'Admin', value: 'Admin' },
            { label: 'Factory', value: 'Factory' },
          ]}
          positionStatic
          withSearch
          name="role"
          value={state.role}
          onChange={(v) => handleStateSchange('role', v)}
        />
      </div>
    </ModalBase>
  );
};

export default AddUserModal;
