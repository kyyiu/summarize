// 判断上传的文件是否修改
try {
    // file文件是个对象按道理不能slice，但是继承自blob
    // blob可以看成二进制字符串，有slice方法
    // blob得arrayBuffer会把二进制转成arraybuffer，并且返回promise，转得过程就要读取文件
    await files.value?.[0]?.raw?.slice(0, 1)?.arrayBuffer();
} catch (error) {
    files.value = [];
    MessagePlugin.error('选择的文件可能已经修改，请重新选择上传');
    return;
}