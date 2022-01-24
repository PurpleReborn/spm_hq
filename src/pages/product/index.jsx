import { useEffect, useState } from 'react';

import { Button } from 'components/atoms';
import { DataTable, PageTitle } from 'components/molecules';
import { AddProductModal } from 'components/modal';

import { ReactComponent as PlusSVG } from 'assets/icons/plus-icon.svg';
import { useModal, useProducts } from 'helpers/hooks';
import { masterDataServices } from 'services/fetch';

import styles from './styles.module.scss';

const { root } = styles;

const ProductPage = (props) => {
  const { isOpen, toggleModal } = useModal(false);
  const {
    columns = [
      { title: 'Product Name', sortable: true, dataIndex: 'name' },
      { title: 'Stock', sortable: true },
      { title: 'Range Quality', sortable: true },
      { title: 'Price', sortable: true },
    ],
  } = props;
  const { data, loading, error, revalidate } = useProducts();

  return (
    <section className={root}>
      <PageTitle title="Product">
        <Button
          variant="primary"
          prefixIcon={<PlusSVG />}
          onClick={toggleModal}
        >
          New Product
        </Button>
      </PageTitle>

      <section>
        <DataTable columns={columns} data={data} loading={loading} />
      </section>

      <AddProductModal isOpen={isOpen} onClose={toggleModal} />
    </section>
  );
};

export default ProductPage;
