
function upload(file, type, suffix) {
  $api.showLoading('上传中')
  return $fetch.file.upload().fetch({
    file,
    type,
    suffix
  }).then(res => {
    $api.hideLoading()
    return res.data
  }).catch(err => {
    $api.showToast('上传失败')
  })
}

function uploadImage(file, type = 1) {
  return upload(file, type, 'jpg')
}

function uploadVoice(file, type = 1){
	return upload(file, type, 'mp4')
}

function uploadAudio(file, type = 1){
	return upload(file, type, 'mp3')
}

export default {
  uploadImage,
  uploadVoice,
  uploadAudio
}
