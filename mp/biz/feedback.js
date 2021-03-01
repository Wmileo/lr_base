import server from '@xq/server'


function save(params) {
  return $fetch.feedback.save().fetch(params).then(res => {
    return res;
  }).catch(err=>{
    throw err;
  });
}

if (!$xq) {
  $xq = {}
}
$xq.feedback = {
  save,
}