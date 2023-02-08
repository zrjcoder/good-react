import { default as dayjs } from 'dayjs'

export const formatDate = (date: number) => dayjs(date).format('YYYY/MM/DD HH:mm:ss')
