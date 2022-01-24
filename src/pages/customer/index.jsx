import { useState } from 'react';
import { Button } from 'components/atoms';
import { DataTable, PageTitle } from 'components/molecules';

import { ReactComponent as PlusSVG } from 'assets/icons/plus-icon.svg';
import { ReactComponent as EditSVG } from 'assets/icons/edit-pencil-icon.svg';
import { useCustomer, useModal } from 'helpers/hooks';
import { AddCustomerModal } from 'components/modal';

import styles from './styles.module.scss';

const { root } = styles;

const CustomerPage = (props) => {
  const { isOpen, toggleModal } = useModal(false);
  const { data, loading, error, revalidate } = useCustomer();
  const [selected, setSelected] = useState({
    edit: false,
    data: null,
  });

  const columns = [
    { title: 'Name', sortable: true, dataIndex: 'name' },
    { title: 'Address', sortable: true, dataIndex: 'address' },
    { title: 'PIC Name', sortable: true, dataIndex: 'pic_name' },
    { title: 'PIC Number', sortable: true, dataIndex: 'pic_phone_number' },
    {
      title: '',
      sortable: false,
      dataIndex: '_id',
      render: (data, record) => {
        // return <p>edit</p>;
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="secondary"
              prefixIcon={<EditSVG />}
              size="small"
              onClick={() => {
                console.log(record);
                setSelected({
                  edit: true,
                  data: record,
                });
                toggleModal();
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <section className={root}>
      <PageTitle title="Customer">
        <Button
          variant="primary"
          prefixIcon={<PlusSVG />}
          onClick={toggleModal}
        >
          New Customer
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

      <AddCustomerModal
        isOpen={isOpen}
        onClose={() => {
          toggleModal();
          setSelected({
            edit: false,
            data: null,
          });
        }}
        revalidate={revalidate}
        defaultData={selected?.data}
        isEdit={selected.edit}
      />
    </section>
  );
};

export default CustomerPage;
