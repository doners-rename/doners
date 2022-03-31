import CustomButton from 'assets/theme/Button/CustomButton/CustomButton';
import classNames from 'classnames/bind';
import styles from './BoardContents.module.scss';
import editIcon from 'assets/images/icon/edit.svg';
import deleteIcon from 'assets/images/icon/delete.svg';
import H1 from 'assets/theme/Typography/H1/H1';
import P from 'assets/theme/Typography/P/P';
import { ReactComponent as ViewsIcon } from 'assets/images/icon/views.svg';
import Avatar from 'assets/theme/Avatar/Avatar';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteBoard, getBoardDetail } from 'services/api/Board';
import { getUserProfile } from 'services/api/UserApi';

const cx = classNames.bind(styles);
const BoardContents = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [createTime, setCreateTime] = useState('');
  const [writer, setWriter] = useState('');
  const [views, setViews] = useState(0);
  const [isOwn, setIsOwn] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const { community_id } = useParams<string>();

  const navigate = useNavigate();

  useEffect(() => {
    getBoard();
  }, []);

  useEffect(() => {
    checkUser();
    getProfileImg();
  }, [writer]);

  const checkUser = () => {
    const item = localStorage.getItem('user');
    if (typeof item === 'string') {
      const Juser = JSON.parse(item);
      console.log(writer);
      console.log(Juser.userNickname);
      if (writer === Juser.userNickname) {
        setIsOwn(true);
      }
      // console.log(Juser.userNickname);
    }
  };
  const getBoard = async () => {
    if (typeof community_id === 'string') {
      const response = await getBoardDetail(community_id);
      console.log(response.data);
      setTitle(response.data.communityTitle);
      setContents(response.data.communityDescription);
      setCreateTime(response.data.communityCreateTime);
      setWriter(response.data.communityWriter);
      setViews(response.data.communityViews);
    }
  };

  const getProfileImg = async () => {
    const response = await getUserProfile(writer);
    if (response) {
      // 이미지등록
      // setImgSrc(defaultImg);
    }
  };

  const handleDeleteClick = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    deleteHandler();
  };

  const handleModifyClick = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    navigate(`/community/board/modify/${community_id}`);
  };

  const deleteHandler = async () => {
    if (typeof community_id === 'string') {
      const response = await deleteBoard(community_id);
      console.log(response);
      navigate('/community/board');
    }
  };

  function formatDate(value: string) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  }

  return (
    <div className={cx('inner-container')}>
      <header className={cx('article-header')}>
        <div className={cx('button-wrap')}>
          {isOwn ? (
            <div className={cx('buttons')}>
              <CustomButton
                src={editIcon}
                color="yellow"
                shadow
                onClick={handleModifyClick}
              >
                수정
              </CustomButton>
              <CustomButton src={deleteIcon} shadow onClick={handleDeleteClick}>
                삭제
              </CustomButton>
            </div>
          ) : null}
        </div>
        <H1>{title}</H1>

        <div className={cx('info-wrap')}>
          <div className={cx('article-info')}>
            <div>
              <P color="gray">{`작성일: ${formatDate(createTime)}`}</P>
              <div className={cx('sub-info')}>
                <div className={cx('views')}>
                  <ViewsIcon className={cx('icon')} fill="gray" />
                  <P>{`조회수: ${views}`}</P>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('author')}>
            <Avatar src={imgSrc} />
            <div className={cx('name')}>
              <P>{`${writer}`}</P>
            </div>
          </div>
        </div>
      </header>
      <main className={cx('content')}>
        {contents !== '' ? <Viewer initialValue={contents} /> : null}
      </main>
    </div>
  );
};

export default BoardContents;
