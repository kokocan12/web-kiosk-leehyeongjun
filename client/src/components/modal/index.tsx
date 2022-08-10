import { useNavigation } from '@lib/router';
import { OrderModal } from './OrderModal';

const ModalLayer = () => {
  const { hash } = useNavigation();

  return (
    <div className="modal-layer">
      {hash.order && <OrderModal key="order-modal" />}
    </div>
  );
};

export default ModalLayer;
