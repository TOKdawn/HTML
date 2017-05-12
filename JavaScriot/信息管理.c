//
//  main.cpp
//  信息管理
//
//  Created by 张鹏宇 on 2017/4/24.
//  Copyright ? 2017年 张鹏宇. All rights reserved.
//

#include <iostream>
#include <stdio.h>
#include <stdlib.h>
using namespace std;
//文件操作模块,文件以结构体链表的形式存入在文件中.
/*
 fopen相关参数
 “rt”　　　　　　只读打开一个文本文件，只允许读数据
 “wt”　　　　　　只写打开或建立一个文本文件，只允许写数据
 “at”　　　　　　追加打开一个文本文件，并在文件末尾写数据
 “rb”　　　　　　只读打开一个二进制文件，只允许读数据
 “wb”　　　　 　 只写打开或建立一个二进制文件，只允许写数据
 “ab” 　　　　 　追加打开一个二进制文件，并在文件末尾写数据
 “rt+”　　　　　 读写打开一个文本文件，允许读和写
 “wt+”　　　　　 读写打开或建立一个文本文件，允许读写
 “at+”　　　　　 读写打开一个文本文件，允许读，或在文件末追加数 据
 “rb+”　　　　　 读写打开一个二进制文件，允许读和写
 “wb+”　　　　　 读写打开或建立一个二进制文件，允许读和写
 “ab+” 　　　　　读写打开一个二进制文件，允许读，或在文件末追加数据
 */
#define FILRADRESS "/Users/dawn/zpy/information.txt"//文件路径,现在是我电脑上的测试环境,请自行修改.
#define NAMELONGER 10//名字的最大长度
#define QQLONGER 15//QQ号最大长度
#define PHONELONGER 15//电话号最大长度
typedef struct _information{ //储存数据的结构体
      char name[NAMELONGER];//名字
      long int qq;//qq号
      long int phone;//电话号
      int number;//编号

}Information, * Information_p;
typedef  struct BiTNode    /* 结点结构 */
{
      Information_p data;    /* 结点数据 */
      struct BiTNode *lchild, *rchild; /* 左右孩子指针 */
} BiTNode, *BiTree;

/****************链表操作部分*************/

#define NOT_FIND 4
#define NUM_ERROR 3
#define LIST_EMPTY 2
#define MALLOC_ERR 1
#define FUNC_EXIT_SUCESS 0
typedef Information ElemType; //设定链表所储存的数据类型
typedef struct TheList {
      ElemType data;
      struct TheList *next;
      struct TheList *preat;
} str_List; //链表结构重命名为str_List
/**********函数声明*******/
int Double(str_List *list);
int InitList(
             str_List **list,
             int sum /*  ElemType *input 输入获取途径,本程序为在函数里获取键盘输入,可扩展其他方式*/); //创建链表,长度为sum
int ClearList(str_List *list); //清空链表
int ShowList(str_List *list);  //打印链表
int GetElem(int num, ElemType *elem,
            str_List *list); //查找链表第num个元素,值给elem
int SearchElem(char* elem,str_List *list,int type);//在链表里查询数据,返回是第几个,type为查询条件,1名字,2qq,3电话
int ListInsert(int num, ElemType elem,
               str_List *liet); //在链表的num位置插入数据elem
int ListDelete(int num, ElemType *elem,
               str_List *list); //在链表中删除第num元素,并且返回所删除的值
int ListLength(str_List *list, int *sum); //返回链表元素个数
/**********声明结束*******/
int SearchElem(char* elem,str_List *head,int type){
      str_List *p;
      int count;
      int *sum=&count;
      ListLength(head, sum);
      p=head;
      for(int i=1;i<=count;i++){
            switch (type) {
                  case 1:
                        if(! strcmp(elem, p->data.name)){
                              return i;
                        }
                        break;
                  case 2:
                        if(atoi(elem)==p->data.qq){
                              return i;
                        }
                        break;
                  case 3:
                        if( atoi(elem)==p->data.phone){
                              return i;
                        }
                        break;
            }
            p=p->next;
      }
      cout<<"查无此人"<<endl;
      return -1;

}

int ShowList(str_List *head) {
      str_List *p;
      p = head;
      if (head == NULL)
            return LIST_EMPTY;
      do {
            cout<<p->data.name<<endl<<p->data.qq<<endl<<p->data.phone<<endl;
      } while ((p->next) != NULL && (p = p->next)); //先判断后移动链表....
      return FUNC_EXIT_SUCESS;
}

int GetElem(int num, ElemType *elem, str_List *list) {
      str_List *p = list;
      if (p == NULL) {
            return LIST_EMPTY;
      }
      int i = 1;
      while (p && i < num) {
            p = p->next;
            i++;
      }
      if (!p || i > num) //判断第num个元素是否存在
            return NUM_ERROR;
      *elem = p->data;
      return FUNC_EXIT_SUCESS;
}
int ListInsert(int num, ElemType elem, str_List *list) {
      if (list == NULL) {
            return LIST_EMPTY;
      }
      str_List *p;
      str_List *s;
      int j = 1;
      p = list;
      while (p && j < num) {
            p = p->next;
            j++;
      }
      if (!p || j > num)
            return NUM_ERROR;
      s = (str_List *)malloc(sizeof(str_List));
      if (s == NULL) {
            return MALLOC_ERR;
      }
      s->data = elem;
      s->next = p->next;
      s->preat = p;
      p->next = s;
      return FUNC_EXIT_SUCESS;
}
int ClearList(str_List *list) {
      str_List *p, *q;
      p = list->next;
      free(list);
      while (p) {
            q = p->next;
            free(p);
            p = q;
      }
      list->next = NULL;
      return FUNC_EXIT_SUCESS;
}

int ListDelete(int num, ElemType *elem, str_List *list) {
      str_List *p, *q, *t;
      int i;
      p = list;
      if (p == NULL) {
            return LIST_EMPTY;
      }
      for (i = 1; i < num - 1; i++) {
            p = p->next;
      }
      t = p->next;
      q = t->next;
      *elem = t->data;
      free(t);
      p->next = q;
      return FUNC_EXIT_SUCESS;
}
int ListLength(str_List *list, int *num) {
      str_List *p;
      p = list;
      if (p == NULL) {
            return LIST_EMPTY;
      }
      if (p->next == NULL) {
            *num = 1;
            return FUNC_EXIT_SUCESS;
      }
      int i = 1;
      do {
            p = p->next;
            i++;
      } while (p->next != NULL);
      *num = i;
      return FUNC_EXIT_SUCESS;
}
int Double(str_List *list){
      if(list==NULL){
            return LIST_EMPTY;
      }
      str_List *p,*head;
      head=list;
      while(1){
            p=list;
            if(list->next==NULL){
                  break;
            }
            list=list->next;
            list->preat=p;
      }
      return FUNC_EXIT_SUCESS;
}

/********当然也是我以前自己写的垃圾库********/

Information** ListToArr(str_List *head);//链表转数组

void Initialize ();//初始化文件
void Inputfile();//插入信息
void ListToFile(str_List *);//链表存入文件
str_List * FileToList();//文件中取链表
void binary(Information_p * arr,str_List *head,int target);
/* 否则指针p指向查找路径上访问的最后一个结点并返回FALSE */
bool SearchBST(BiTree T, long int key, BiTree f, BiTree *p);

bool InsertBST(BiTree *T, Information_p key);


using namespace std;
int main(int argc, char *argv[]) {
      char a[10]="admin3";
      Information **arr;
      str_List* xxm;
      Initialize();
      xxm = FileToList();
      ListToFile(xxm);
      arr=ListToArr(xxm);

      cout<<"*******"<< SearchElem(a,xxm,1)<<endl;
      binary( arr, xxm,3323);
}

void Initialize (){//初始化文件
      FILE *fp;//文件指针
      int flag;
      fp= fopen(FILRADRESS,"rb");//第一次进行程序时创建
      if(fp==NULL){
            cout<<"文件打开失败"<<endl;
      }
      fclose(fp); //创建文件后关闭文件就好
      cout<<"1.进行初始化"<<endl<<"2.退出";
      while(cin>>flag){
            if(flag==2){

                  return ;
            }
            if(flag==1){
                  Inputfile();
            }
            cout<<"1.进行初始化"<<endl<<"2.退出";
      }

}
void Inputfile(){//插入数据
      Information x;
      FILE *fp;
      cout<<"请输入名字"<<endl;
      cin>>x.name;
      cout<<"请输入QQ"<<endl;
      cin>>x.qq;
      cout<<"请输入电话"<<endl;
      cin>>x.phone;
      fp = fopen(FILRADRESS, "ab");
      if (fp == NULL) {
            printf("文件打开错误");
            return ;
      }
      fseek(fp,0,SEEK_END);//把文件指针移到文件结尾,添加操作都是加到最结尾.
      fwrite(&x,sizeof(Information),1,fp);//尾部添加数据.
      fclose(fp);
}//QAQ文件删改,文件删改,文件删改,还是要做链表整体存储,这函数写的毫无意义啊,代码完全没复用Orz

str_List * FileToList(){
      Information x;
      FILE *fp;
      fp = fopen(FILRADRESS, "rb");//打开文件
      int count,filesize;
      fseek(fp,0,SEEK_END);//设置文件指针指向文件末尾
      filesize = ftell(fp);//获取当前文件指针的相对偏移长度
      count = filesize/sizeof(Information);//偏移长度除单位长度偏移量就是结构体数目
      cout<<"结构体数量"<<count<<"文件大小"<<filesize<<endl;
      rewind(fp);//复原文件指针位置至起始
      str_List *head;
      str_List *p;
      str_List *r;
      int i;
      head = (str_List *)malloc(sizeof(str_List));
      fread(&x, sizeof(Information), 1, fp);//读取一段单位长度的数据,就是读取出来一个结构体.
      (head)->data=x;
      r = head;
      for (i = 1; i < count; i++) {//链表操作
            p = (str_List *)malloc(sizeof(str_List));
            fread(&x, sizeof(Information), 1, fp);
            p->data=x;
            r->next = p;
            r = p;
      }
      r->next = NULL;
      ShowList(head);
      return head;
}
void ListToFile(str_List* head){
      FILE * fp;
      Information x;
      int count;
      int *sum=&count;
      ListLength(head, sum);
      fp = fopen(FILRADRESS, "w");//清空文件
      for(int i=1;i<=count;i++){
            GetElem(i, &x,head);
            fp = fopen(FILRADRESS, "ab");
            fseek(fp,0,SEEK_END);//把文件指针移到文件结尾,添加操作都是加到最结尾.
            fwrite(&x,sizeof(Information),1,fp);//尾部添加数据.
            fclose(fp);
      }
       ShowList(head);
}
Information_p * ListToArr(str_List *head){//链表存成数组
      int count;
      str_List* p;
      p=head;
      int *sum=&count;
      ListLength(head, sum);//获取长度
      void* tmp =malloc(sizeof(void *)*count);//申请内存空间
      Information_p * a =(Information_p *) tmp;//强转为结构体指针
      a[0]=&(head->data);
      for(int i=1;i<count;i++){
            p=p->next;
            a[i]=&p->data;
            cout<<a[i]->qq<<endl;
      }
      return a;
}


void binary(Information_p * arr,str_List *head,int target){
      int count;
      int *sum=&count;
      Information_p  temp;
      ListLength(head, sum);
      int i, j;
      for (j = 0; j < count - 1; j++)//排序
            for (i = 0; i < count - 1 - j; i++)
            {
                  if(arr[i]->qq > arr[i + 1]->qq)
                  {
                        temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                  }
            }
      int low=0;
      int high=count-1;
      while(low<=high)//二分查找
      {
            int mid=(low+high)/2;
            if(arr[mid]->qq>target)
                  high=mid-1;
            else if(arr[mid]->qq<target)
                  low=mid+1;
            else{
                  cout<<arr[mid]->name<<endl<<arr[mid]->phone<<endl;
                  return;
            }
      }
      cout<<"失败";
      return;
}


BiTree * ListToTree(str_List *head){//链表存成树
      int count;
      str_List* p;
      p=head;
      int *sum=&count;
      ListLength(head, sum);//获取长度
      BiTree *T = nullptr;

      for(int i=0;i<count;i++){
            InsertBST(T, &p->data);
            p=p->next;

      }
      return T;
}

/* 递归查找二叉排序树T中是否存在key, */
/* 指针f指向T的双亲，其初始调用值为NULL */
/* 若查找成功，则指针p指向该数据元素结点，并返回TRUE */
/* 否则指针p指向查找路径上访问的最后一个结点并返回FALSE */
bool SearchBST(BiTree T, long int key, BiTree f, BiTree *p)
{
      if (!T)    /*  查找不成功 */
      {
            *p = f;
            return false;
      }
      else if (key==T->data->phone) /*  查找成功 */
      {
            *p = T;
            return true;
      }
      else if (key<T->data->phone)
            return SearchBST(T->lchild, key, T, p);  /*  在左子树中继续查找 */
      else
            return SearchBST(T->rchild, key, T, p);  /*  在右子树中继续查找 */
}

bool InsertBST(BiTree *T, Information_p key)
{
      BiTree p,s;
      if (!SearchBST(*T, key->phone, NULL, &p)) /* 查找不成功 */
      {
            s = (BiTree)malloc(sizeof(BiTNode));
            s->data = key;
            s->lchild = s->rchild = NULL;
            if (!p)
                  *T = s;            /*  插入s为新的根结点 */
            else if (key<p->data)
                  p->lchild = s;    /*  插入s为左孩子 */
            else
                  p->rchild = s;  /*  插入s为右孩子 */
            return true;
      }
      else
            return false;  /*  树中已有关键字相同的结点，不再插入 */
}
