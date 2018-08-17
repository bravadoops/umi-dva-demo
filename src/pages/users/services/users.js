import request from '../../../utils/request';

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=5`);
}

// 使用json-server创建、更改和删除数据的时候 headers Content-Type字段需要进行设置
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': "application/json"},
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify(values),
  });
}

// create
export function create(values) {
  console.log('service create :');
  console.log(JSON.stringify(values));
  return request('/api/users', {
    method: 'POST',
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify(values),
  });
}
