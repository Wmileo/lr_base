
function save(params) {
  params.appType = ($env.mp == 'c' ? '1' : '2')
  return $fetch.feedback.save().fetch(params).then(res => {
    return res;
  })
}

export default {
  save
}
