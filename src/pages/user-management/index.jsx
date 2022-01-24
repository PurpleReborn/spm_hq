import { Button } from 'components/atoms';
import { DataTable, PageTitle } from 'components/molecules';

import { ReactComponent as PlusSVG } from 'assets/icons/plus-icon.svg';
import { useModal, useUser } from 'helpers/hooks';
import { AddUserModal } from 'components/modal';

import styles from './styles.module.scss';

const { root } = styles;

const UserManagementPage = (props) => {
  const {} = props;
  const { isOpen, toggleModal } = useModal(false);
  const { data, loading, revalidate } = useUser();

  const columns = [
    { title: 'Username', sortable: true, dataIndex: 'username' },
    { title: 'NIP', sortable: true, dataIndex: 'nip' },
    { title: 'Email', sortable: true, dataIndex: 'email' },
    { title: 'Access', sortable: true, dataIndex: 'role' },
  ];

  return (
    <section className={root}>
      <PageTitle title="User Management">
        <Button
          variant="primary"
          prefixIcon={<PlusSVG />}
          onClick={toggleModal}
        >
          Add User
        </Button>
      </PageTitle>

      <section>
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          paginate
          pageSize={10}
        />
      </section>

      <AddUserModal
        isOpen={isOpen}
        onClose={toggleModal}
        revalidate={revalidate}
      />
    </section>
  );
};

export default UserManagementPage;
