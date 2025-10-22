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