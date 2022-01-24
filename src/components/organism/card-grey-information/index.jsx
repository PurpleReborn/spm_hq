import { Card } from 'components/atoms';
import { TitleDescriptionItem } from 'components/molecules';

import styles from './styles.module.scss';

const { root, container } = styles;

const CardGreyInformation = (props) => {
  const { title, description, double } = props;

  return (
    <Card color="grey">
      <div className={container} data-double={double}>
        {double ? (
          <>
            <TitleDescriptionItem
              title={title[0]}
              description={description[0]}
            />
            <TitleDescriptionItem
              title={title[1]}
              description={description[1]}
            />
          </>
        ) : (
          <TitleDescriptionItem title={title} description={description} />
        )}
      </div>
    </Card>
  );
};

export default CardGreyInformation;
