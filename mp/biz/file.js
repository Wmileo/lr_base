import { fetchs } from '../server/fetch.js'
import $api from '@xq/api'

let Fetchs = fetchs.file

function upload(file, path, suffix) {
  $api.showLoading('上传中')
  return Fetchs.upload().fetch({
    file,
    path,
    suffix
  }).then(res => {
    $api.hideLoading()
    return res.data
  }).catch(err => {
    $api.showToast('上传失败')
  })
}

function uploadImage(file, path = 'app') {
  return upload(file, path, 'jpg')
}

function uploadVoice(file, path = 'app'){
	return upload(file, path, 'mp4')
}

function uploadAudio(file, path = 'app'){
	return upload(file, path, 'mp3')
}

export default {
  uploadImage,
  uploadVoice,
  uploadAudio
}
