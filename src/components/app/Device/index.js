import Button from '../Button';
import { DESKTOP, MOBILE } from '../../../utils';

function Device({ activeDevice, setActiveDevice }) {
  return (
    <div className="d-flex">
      <Button
        isActive={activeDevice === DESKTOP}
        text={'Desktop Settings'}
        type="button"
        onClickHandler={() => setActiveDevice(DESKTOP)}
      />
      <Button
        isActive={activeDevice !== DESKTOP}
        text={'Mobile Settings'}
        type="button"
        onClickHandler={() => setActiveDevice(MOBILE)}
      />
    </div>
  );
}

export default Device;
