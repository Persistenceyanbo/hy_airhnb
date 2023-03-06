import hyRequest from '@/service'
interface IHighScoreData {
  list: any[]
  subtitle: string
  title: string
  type: string
  _id: string
}
hyRequest
  .request<IHighScoreData>({
    url: '/home/highscore',
    interceptors: {
      requestSuccessFn: (config) => {
        return config
      }
    }
  })
  .then((res: IHighScoreData) => {})
