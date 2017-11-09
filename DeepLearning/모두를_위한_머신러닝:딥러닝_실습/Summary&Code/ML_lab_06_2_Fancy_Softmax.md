

```python
# 좀더 fancy한 방법으로 Softmax Classification 활용하기
# Lab 6 Softmax Classifier
import tensorflow as tf
# 넘파이가 사용되는 걸 봅시다.
import numpy as np
tf.set_random_seed(777)  # for reproducibility

# Predicting animal type based on various features

# 앞에서는 일일이 설정했었지만 이번에는 .csv를 활용해서 일괄되게 가져온다. 벌써 fancy!
xy = np.loadtxt('data-04-zoo.csv', delimiter=',', dtype=np.float32)

x_data = xy[:, 0:-1]
#
y_data = xy[:, [-1]]

print(x_data.shape, y_data.shape)

nb_classes = 7  # 0 ~ 6
# 초기값을 설정하는 부분인데, 여기서 주의할 점은 one_hot의 입력과 아웃에 대해 고려할 필요가 있다.
X = tf.placeholder(tf.float32, [None, 16])
Y = tf.placeholder(tf.int32, [None, 1])  # 0 ~ 6

# 다양한 클래스를 어떻게 원핫으로 변경할 수 있을까?
# [[[0000001],[0000010],[0000100].. ]  의 개념은?
# 이런방식으로 변경해서 차원수를 증가된 이유...
Y_one_hot = tf.one_hot(Y, nb_classes)  # one hot으로 변환.

print("one_hot", Y_one_hot) # shape = (?, 1, 7)
Y_one_hot = tf.reshape(Y_one_hot, [-1, nb_classes])
print("reshape", Y_one_hot) # 이렇게 만들어야 함. shape = (?, 7)

# 입력, 출력의 초기값을 설정
W = tf.Variable(tf.random_normal([16, nb_classes]), name='weight')
b = tf.Variable(tf.random_normal([nb_classes]), name='bias')

# tf.nn.softmax computes softmax activations
# softmax = exp(logits) / reduce_sum(exp(logits), dim)
# logits = score
logits = tf.matmul(X, W) + b
hypothesis = tf.nn.softmax(logits)

# 활성화가 나오는데? with logits는 뭐냐? Logits을 달라! 왜!? 왜!?
# one_hot을 쓰기 위해서일까? 쉽게 사용가능하게 하기 위해서??
# 이렇든 저렇든, 교차엔트로피의 공식을 직접 만들 필요없이 사용 가능.
# Cross entropy cost/loss
# 쓰기전에 -tf.reduce_sum(Y * tf.log(hypothesis), axis=1)
cost_i = tf.nn.softmax_cross_entropy_with_logits(logits=logits,
                                                 labels=Y_one_hot)
cost = tf.reduce_mean(cost_i)
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

# 확률이 나오면 레벨로 변경해서 1등을 가져온다.
prediction = tf.argmax(hypothesis, 1)
# 맞는지 안맞는지 확인하고 모아서. 평균을 내면 정확도가 나타난다.
correct_prediction = tf.equal(prediction, tf.argmax(Y_one_hot, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
# Launch graph
# 학습을 시켜야한당...
with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())

    for step in range(2000):
        sess.run(optimizer, feed_dict={X: x_data, Y: y_data})
        if step % 100 == 0:
            loss, acc = sess.run([cost, accuracy], feed_dict={
                                 X: x_data, Y: y_data})
            print("Step: {:5}\tLoss: {:.3f}\tAcc: {:.2%}".format(
                step, loss, acc))

    # Let's see if we can predict
    pred = sess.run(prediction, feed_dict={X: x_data})
    # y_data: (N,1) = flatten => (N, ) matches pred.shape
    # 평평하게 해준다?????? [[1],[0]] => [1,0] 이렇게 만듬.
    for p, y in zip(pred, y_data.flatten()):
        print("[{}] Prediction: {} True Y: {}".format(p == int(y), p, int(y)))


'''
Step:     0 Loss: 5.106 Acc: 37.62%
Step:   100 Loss: 0.800 Acc: 79.21%
Step:   200 Loss: 0.486 Acc: 88.12%
Step:   300 Loss: 0.349 Acc: 90.10%
Step:   400 Loss: 0.272 Acc: 94.06%
Step:   500 Loss: 0.222 Acc: 95.05%
Step:   600 Loss: 0.187 Acc: 97.03%
Step:   700 Loss: 0.161 Acc: 97.03%
Step:   800 Loss: 0.140 Acc: 97.03%
Step:   900 Loss: 0.124 Acc: 97.03%
Step:  1000 Loss: 0.111 Acc: 97.03%
Step:  1100 Loss: 0.101 Acc: 99.01%
Step:  1200 Loss: 0.092 Acc: 100.00%
Step:  1300 Loss: 0.084 Acc: 100.00%
...
[True] Prediction: 0 True Y: 0
[True] Prediction: 0 True Y: 0
[True] Prediction: 3 True Y: 3
[True] Prediction: 0 True Y: 0
[True] Prediction: 0 True Y: 0
[True] Prediction: 0 True Y: 0
[True] Prediction: 0 True Y: 0
[True] Prediction: 3 True Y: 3
[True] Prediction: 3 True Y: 3
[True] Prediction: 0 True Y: 0
'''
```
