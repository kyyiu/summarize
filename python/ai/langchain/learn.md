# RAG  
## 概念
解决了大模型幻觉问题，通过引入外部知识，提高模型的准确性和可靠性。

# Agent
## 概念  
利用LLM的推理决策，记忆和执行任务。

# 消息
## SystemMessage
```
from langchain_core.messages import SystemMessage
系统消息，用于设置模型的行为和指令。
```
## HumanMessage
```
from langchain_core.messages import HumanMessage
人类消息，用于向模型传递指令或问题。
```
## AIMessage
```
from langchain_core.messages import AIMessage
模型消息，用于接收模型的回复或执行结果。
```

# 提示词
## PromptTemplate
```
from langchain_core.prompts import PromptTemplate
提示词模板，用于定义模型的输入格式和指令。
LLM提示模板，用于生成字符串提示，用python的字符串来模板提示

1.构造方法
prompt_template = PromptTemplate(
    input_variables=["input"],
    template="请根据以下输入生成一个响应：{input}",
)

prompt_template = PromptTemplate.from_template(
    template="请根据以下输入生成一个响应：{input}"
)

2.填充
filled_prompt = prompt_template.format(input="你好")
print(filled_prompt)

filled_prompt = prompt_template.invoke(input={input: "你好"})
print(filled_prompt)

3.结合大模型
from langchain_llms import OpenAI
llm = OpenAI()
result = llm.invoke(filled_prompt)
print(result)
```

## ChatPromptTemplate
```
from langchain_core.prompts import ChatPromptTemplate
聊天提示模板，用于定义模型的输入格式和指令。
组合各种角色的消息模板

1.实例化方式
chat_prompt_template = ChatPromptTemplate(
    messages=[
        ("system", "你是一个专业的翻译"),
        ("human", "{input}"),
    ],
    input_variables=["input"],
)

chat_prompt_template = ChatPromptTemplate.from_messages([
    ("system", "你是一个专业的翻译"),
    ("human", "{input}"),
])



2.调用提示词模板的几种方法
invoke 返回ChatPromptValue,
format 返回str,
format_messages 返回消息列表list,
format_prompt 返回ChatPromptValue

chat_prompt_template.invoke(input={"input": "你好"})

3. 更丰富的实例化参数类型
4. 结合LLM
messages = [
    ("system", "你是一个诗人，名字叫{name}"),
    ("human", "写一首{season}的诗"),
]

chat_prompt_template = ChatPromptTemplate.from_messages(messages)

prompt_res = chat_prompt_template.invoke({"name": "张三", "season": "夏天"})
# llm.invoke(prompt_res)
for chunk in llm.stream(prompt_res):
    print(chunk.content, end='', flush=True)

5.插入消息列表,MessagePlaceholder
```

## XxxMessagePromptTemplate
```
from langchain_core.prompts import XxxMessagePromptTemplate
特定角色的消息提示模板，用于定义该角色的输入格式和指令。
消息模板词模板，包括SystemMessagePromptTemplate、HumanMessagePromptTemplate、AIMessagePromptTemplate等
```

## FewShotPromptTemplate
```
from langchain_core.prompts import FewShotPromptTemplate
少样本提示模板，用于定义模型的输入格式和指令。
样本提示词模板，通过示例来教模型如何生成正确的输出。

examples = [
  {
    "question": "请帮忙描述下古龙?",
    "answer": 
"""
姓名:古龙，出生日期:1937年,代表作:《楚留香传奇系列》、《陆小凤系列》、《萧十一郎系列》
"""
  },
  {
    "question": "请帮忙描述下金庸?",
    "answer": 
"""
姓名:金庸，出生日期:1924年,代表作:《射雕英雄传》、《神雕侠侣》、《天龙八部》
"""
  },
  {
    "question": "请帮忙描述下工具人?",
    "answer":
"""
姓名:工具人，出生日期:1988年,代表作:《工具人传奇》、《工具人上班》、《工具人睡觉》
"""
  }
]

example_prompt = PromptTemplate(input_variables=["question", "answer"], template="问题: {question}\n 回答：{answer}")
prompt = FewShotPromptTemplate(
    examples=examples, 
    example_prompt=example_prompt, 
    suffix="问题: {input}", 
    input_variables=["input"]
)

res = llm.invoke(prompt.invoke({"input": "请问工具人的代表作是什么？"}))

print(res.content)
```

## PipelinePrompt
```
from langchain_core.prompts import PipelinePromptTemplate
管道提示模板，用于定义模型的输入格式和指令。
将多个提示模板组合在一起，形成一个完整的提示。
```

## 自定义模板
```
from langchain_core.prompts import CustomPromptTemplate
自定义提示模板，用于定义模型的输入格式和指令。
可以根据具体需求，自定义不同的提示模板。
```


# 输出解析器
## StrOutputParser
```
from langchain_core.output_parsers import StrOutputParser
字符串输出解析器，用于将模型的输出解析为字符串。


```

## JsonOutputParser
```
from langchain_core.output_parsers import JsonOutputParser
JSON输出解析器，用于将模型的输出解析为JSON格式。
```

## CommaSeparatedListOutputParser
```
from langchain_core.output_parsers import CommaSeparatedListOutputParser
CSV解析器逗号分隔列表输出解析器，用于将模型的输出解析为逗号分隔的列表。
```

## XMLOutputParser
```
from langchain_core.output_parsers import XMLOutputParser
XML输出解析器，用于将模型的输出解析为XML格式。
```

## StructuredOutputParser
```
from langchain_core.output_parsers import StructuredOutputParser
结构化输出解析器，用于将模型的输出解析为结构化的格式。
```