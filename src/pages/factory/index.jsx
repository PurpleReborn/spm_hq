import { useEffect, useState } from 'react';

import { Button } from 'components/atoms';
import { DataTable, PageTitle } from 'components/molecules';
import { AddFactoryModal } from 'components/modal';

import { ReactComponent as PlusSVG } from 'assets/icons/plus-icon.svg';
import { ReactComponent as EditSVG } from 'assets/icons/edit-pencil-icon.svg';
import { useFactory, useModal } from 'helpers/hooks';
import { masterDataServices } from 'services/fetch';

import styles from './styles.module.scss';
import { format } from 'date-fns';

const { root, machine_container } = styles;

const FactoryPage = (props) => {
  const { isOpen, toggleModal } = useModal(false);
  const { data, loading, error, revalidate } = useFactory();
  const [selected, setSelected] = useState({
    edit: false,
    data: null,
  });

  const columns = [
    { title: 'Name', dataIndex: 'name', sortable: true },
    {
      title: 'Machine',
      dataIndex: 'machines',
      sortable: true,
      width: '90%',
      render: (data, record) => {
        console.log(record, 'this is data machines');
        return Array.isArray(data) ? (
          <div className={machine_container}>
            {data?.map((machine) => {
              return <p key={machine?._id}>{machine?.name}</p>;
            })}
          </div>
        ) : (
          '-'
        );
      },
    },
    {
      title: 'Tanggal',
      dataIndex: 'createdAt',
      sortable: true,
      render: (data) => (
        <p>{data ? format(new Date(data), 'MM/dd/yyyy') : '-'}</p>
      ),
    },
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
      <PageTitle title="Factory">
        <Button
          variant="primary"
          prefixIcon={<PlusSVG />}
          onClick={toggleModal}
        >
          New Factory
        </Button>
      </PageTitle>

      <section>
        <DataTable
          columns={columns}
          data={data}
          alignTop
          loading={loading}
          withPagination
          pageSize={10}
        />
      </section>

      <AddFactoryModal
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

export default FactoryPage;
