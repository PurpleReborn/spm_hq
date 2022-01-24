import { useState } from 'react';
import { useHistory } from 'react-router';

import { Button } from 'components/atoms';
import { DataTable, PageTitle, TabsGroup } from 'components/molecules';

import { ReactComponent as PlusSVG } from 'assets/icons/plus-icon.svg';

import styles from './styles.module.scss';
import { format } from 'date-fns';
import { useDeliveryOrder, useModal } from 'helpers/hooks';
import { DrawerDetailDeliveryOrder } from 'components/drawer';

const { root } = styles;

const DeliveryOrderPage = (props) => {
  const [selectedTab, setSelectedTab] = useState('On Going');
  const history = useHistory();
  const { data, loading, error, revalidate } = useDeliveryOrder(
    `?status=${selectedTab}`
  );
  const { isOpen, toggleModal } = useModal(false);
  const [selectedData, setSelectedData] = useState(null);

  const columns = [
    {
      title: 'Order Number',
      sortable: true,
      dataIndex: 'order',
      render: (data) => {
        return <p>{data?.order_number || '-'}</p>;
      },
    },
    {
      title: 'Quantity',
      sortable: true,
      dataIndex: 'quantity',
    },
    {
      title: 'Total Item',
      sortable: true,
      dataIndex: 'item',
      render: (data) => <p>{data?.length}</p>,
    },
    {
      title: 'Date Plan',
      sortable: true,
      dataIndex: 'delivery_plan_date',
      render: (data) =>
        data ? <p>{format(new Date(data), 'dd/MM/yyyy')}</p> : '-',
    },
    {
      title: '',
      dataIndex: '_id',
      render: (data, record) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="primary"
              size="small"
              onClick={() => {
                setSelectedData(record);
                toggleModal();
              }}
            >
              Detail
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <section className={root}>
      <PageTitle title="Delivery Order">
        <Button
          variant="primary"
          prefixIcon={<PlusSVG />}
          onClick={() => {
            history.push('/form/delivery-order');
          }}
        >
          Create New
        </Button>
      </PageTitle>

      <section>
        <TabsGroup
          selectedValue={selectedTab}
          selections={[
            {
              label: 'On Going',
              value: 'On Going',
            },
            {
              label: 'Completed',
              value: 'Finish',
            },
          ]}
          onChange={(value) => setSelectedTab(value)}
        />
      </section>

      <section>
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          paginate
          pageSize={10}
        />
      </section>

      <DrawerDetailDeliveryOrder
        isOpen={isOpen}
        toggleModal={toggleModal}
        data={selectedData}
        refetchData={revalidate}
      />
    </section>
  );
};

export default DeliveryOrderPage;
