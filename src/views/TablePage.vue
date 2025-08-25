<template>
  <div>
    <a-card title="用户列表">
      <template #extra>
        <a-button type="primary">
          <plus-outlined />
          新增用户
        </a-button>
      </template>

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <a-avatar :src="record.avatar" />
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag :color="record.status === 'active' ? 'green' : 'red'">
              {{ record.status === 'active' ? '活跃' : '禁用' }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small">编辑</a-button>
              <a-button type="link" size="small" danger>删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'

const loading = ref(false)

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
  },
]

const dataSource = [
  {
    key: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    status: 'active',
    createTime: '2024-01-01',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
  {
    key: '2',
    name: '李四',
    email: 'lisi@example.com',
    phone: '13800138001',
    status: 'inactive',
    createTime: '2024-01-02',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
  {
    key: '3',
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13800138002',
    status: 'active',
    createTime: '2024-01-03',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
]

const pagination = {
  current: 1,
  pageSize: 10,
  total: 50,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: [number, number]) =>
    `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
}
</script>
