import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants/constants';
import { routerRedux } from 'dva/router';
import UserModal from './UserModal';

 function Users({ dispatch, list: dataSource, total, page: current }) {
    // 如果传入 { dispatch, users}
    // const {list: dataSource, total, page: current } = users;
    function deleteHandler(id) {
      dispatch({
        type: 'users/remove',
        payload: id,
      });
    }

    function editHandler(id, values) {
      dispatch({
        type: 'users/patch',
        payload: {
          id,
          values,
        }
      });
    }

    // create
    function createHandler(values) {
      console.log('create handler start');
      dispatch({
        type: 'users/create',
        payload: values,
      });
    }

    function pageChangeHandler(page) {
      dispatch(routerRedux.push({
        pathname: '/users',
        query: { page },
      }));
    }
    const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.normal}>
      <div className={styles.create}>
        <UserModal record={{}} onOk={createHandler}>
          <Button type="primary">Create User</Button>
        </UserModal>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}

          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}
 function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,

  };
}
// function mapStateToProps({users}) {
//   return {users};
// }
export default connect(mapStateToProps)(Users);