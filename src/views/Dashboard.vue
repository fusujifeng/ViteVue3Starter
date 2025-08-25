<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <a-statistic title="总用户数" :value="11893" :precision="0" style="margin-right: 50px">
            <template #prefix>
              <user-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="总订单数" :value="1128" :precision="0">
            <template #prefix>
              <shopping-cart-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="总收入" :value="9280" :precision="2" suffix="元">
            <template #prefix>
              <dollar-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="增长率" :value="11.28" :precision="2" suffix="%" class="demo-class">
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="12">
        <a-card title="最近活动">
          <a-list :data-source="activities" item-layout="horizontal">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :description="item.description">
                  <template #title>
                    <a href="#">{{ item.title }}</a>
                  </template>
                  <template #avatar>
                    <a-avatar :src="item.avatar" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="快速操作">
          <a-space direction="vertical" style="width: 100%">
            <a-button type="primary" block>
              <plus-outlined />
              新建用户
            </a-button>
            <a-button block>
              <file-add-outlined />
              新建订单
            </a-button>
            <a-button block>
              <setting-outlined />
              系统设置
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  PlusOutlined,
  FileAddOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'

const activities = [
  {
    title: '用户张三注册了账号',
    description: '2小时前',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
  {
    title: '订单#12345已完成',
    description: '4小时前',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
  {
    title: '系统更新完成',
    description: '1天前',
    avatar: 'https://joeschmoe.io/api/v1/random',
  },
]
</script>
