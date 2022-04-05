import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './FundModal.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from 'assets/theme/Button/Button';
import Input from 'assets/theme/Input/Input';
import { checkNickname } from 'services/api/UserApi';
import Avatar from 'assets/theme/Avatar/Avatar';
import Span from 'assets/theme/Typography/Span/Span';
import Progressbar from 'assets/theme/Progressbar/Progressbar';
import H4 from 'assets/theme/Typography/H4/H4';
import H2 from 'assets/theme/Typography/H2/H2';
import H3 from 'assets/theme/Typography/H3/H3';
import {
  nowBalance,
  nowFundraiserCount,
  withdraw,
} from 'services/blockchain/SsfApi';
import { ApplicationProfileListType } from 'types/ApplicationTypes';
import { getWalletAccount } from 'utils/walletAddress';
const cx = classNames.bind(styles);
type ProfileType = {
  focus: number;
  // user: string;
};
const FundModal = (props: {
  open?: any;
  close?: any;
  contractAddress: string;
  targetAmount: number;
}) => {
  const { open, close, contractAddress, targetAmount } = props;

  const [target, setTarget] = useState(targetAmount);
  const [totalDoners, setTotalDoners] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [current, setCurrent] = useState(0);
  let rate = Math.floor((current / target) * 100);

  // console.log(target);

  /* 모금액 수령하기 */
  const handleWithdraw = async () => {
    if (walletAddress) {
      const response = await withdraw(contractAddress, walletAddress);
      console.log(response);
    }
  };

  /* 모금 달성률 */
  const calcAchievementRate = async () => {
    // let rate = Math.floor((current / target) * 100);
    const currentBalance = await nowBalance(contractAddress);
    // console.log(currentBalance);
    setCurrent(currentBalance);
  };

  /* 총 기부자 */
  const getTotalDoners = async () => {
    const doners = await nowFundraiserCount(contractAddress);
    // console.log(doners);
    setTotalDoners(doners);
  };

  /* 사용자의 지갑주소 */
  const getUserWalletAddress = async () => {
    const address = await getWalletAccount();
    setWalletAddress(address);
  };

  useEffect(() => {
    //// getApplicationDetail();
    calcAchievementRate();
    getUserWalletAddress();
    getTotalDoners();
  }, []);

  return (
    <div
      className={
        open ? [styles.openModal, styles.modal].join(' ') : styles['modal']
      }
    >
      {open ? (
        <section>
          <header>
            모금액 수령하기
            <button className={cx('close')} onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div className={cx('total_fund_raised')}>
              <div className={cx('data-row')}>
                <div className={cx('value-row')}>
                  <div className={cx('value-title')}>
                    <H4>총 모금액 </H4>
                  </div>
                  <H2>{String(current)}</H2>
                  <H4>SSF</H4>
                </div>
                <div className={cx('people-row')}>
                  <div className={cx('value-title')}>
                    <H4>총</H4>
                  </div>
                  <H3>{String(totalDoners)}</H3>
                  <H4> 명의 기부자</H4>
                </div>
                <Progressbar value={rate} />
                <div className={cx('')}>
                  <div className={cx('date-title')}>
                    <Span color="gray">모금액 달성률 : </Span>
                    <Span color="green">
                      {String(Math.floor((current / target) * 100)).concat('%')}
                    </Span>
                    <Span color="gray">{`(${current} SSF)`}</Span>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('title')}>수령할 지갑 주소</div>
            <div className={cx('input')}>
              <div className={cx('inputWithBtn')}>
                <Input
                  id="nickname"
                  value={walletAddress}
                  type="text"
                  disabled={true}
                />
                <div className={cx('inputBtn')}></div>
              </div>
            </div>
          </main>
          <footer>
            <Button color="primary" size="large" onClick={handleWithdraw}>
              수령하기
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default FundModal;
