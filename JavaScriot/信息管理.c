//
//  main.cpp
//  ��Ϣ����
//
//  Created by ������ on 2017/4/24.
//  Copyright ? 2017�� ������. All rights reserved.
//

#include <iostream>
#include <stdio.h>
#include <stdlib.h>
using namespace std;
//�ļ�����ģ��,�ļ��Խṹ���������ʽ�������ļ���.
/*
 fopen��ز���
 ��rt��������������ֻ����һ���ı��ļ���ֻ���������
 ��wt��������������ֻд�򿪻���һ���ı��ļ���ֻ����д����
 ��at��������������׷�Ӵ�һ���ı��ļ��������ļ�ĩβд����
 ��rb��������������ֻ����һ���������ļ���ֻ���������
 ��wb���������� �� ֻд�򿪻���һ���������ļ���ֻ����д����
 ��ab�� �������� ��׷�Ӵ�һ���������ļ��������ļ�ĩβд����
 ��rt+������������ ��д��һ���ı��ļ����������д
 ��wt+������������ ��д�򿪻���һ���ı��ļ��������д
 ��at+������������ ��д��һ���ı��ļ���������������ļ�ĩ׷���� ��
 ��rb+������������ ��д��һ���������ļ����������д
 ��wb+������������ ��д�򿪻���һ���������ļ����������д
 ��ab+�� ������������д��һ���������ļ���������������ļ�ĩ׷������
 */
#define FILRADRESS "/Users/dawn/zpy/information.txt"//�ļ�·��,�������ҵ����ϵĲ��Ի���,�������޸�.
#define NAMELONGER 10//���ֵ���󳤶�
#define QQLONGER 15//QQ����󳤶�
#define PHONELONGER 15//�绰����󳤶�
typedef struct _information{ //�������ݵĽṹ��
      char name[NAMELONGER];//����
      long int qq;//qq��
      long int phone;//�绰��
      int number;//���

}Information, * Information_p;
typedef  struct BiTNode    /* ���ṹ */
{
      Information_p data;    /* ������� */
      struct BiTNode *lchild, *rchild; /* ���Һ���ָ�� */
} BiTNode, *BiTree;

/****************�����������*************/

#define NOT_FIND 4
#define NUM_ERROR 3
#define LIST_EMPTY 2
#define MALLOC_ERR 1
#define FUNC_EXIT_SUCESS 0
typedef Information ElemType; //�趨�������������������
typedef struct TheList {
      ElemType data;
      struct TheList *next;
      struct TheList *preat;
} str_List; //����ṹ������Ϊstr_List
/**********��������*******/
int Double(str_List *list);
int InitList(
             str_List **list,
             int sum /*  ElemType *input �����ȡ;��,������Ϊ�ں������ȡ��������,����չ������ʽ*/); //��������,����Ϊsum
int ClearList(str_List *list); //�������
int ShowList(str_List *list);  //��ӡ����
int GetElem(int num, ElemType *elem,
            str_List *list); //���������num��Ԫ��,ֵ��elem
int SearchElem(char* elem,str_List *list,int type);//���������ѯ����,�����ǵڼ���,typeΪ��ѯ����,1����,2qq,3�绰
int ListInsert(int num, ElemType elem,
               str_List *liet); //�������numλ�ò�������elem
int ListDelete(int num, ElemType *elem,
               str_List *list); //��������ɾ����numԪ��,���ҷ�����ɾ����ֵ
int ListLength(str_List *list, int *sum); //��������Ԫ�ظ���
/**********��������*******/
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
      cout<<"���޴���"<<endl;
      return -1;

}

int ShowList(str_List *head) {
      str_List *p;
      p = head;
      if (head == NULL)
            return LIST_EMPTY;
      do {
            cout<<p->data.name<<endl<<p->data.qq<<endl<<p->data.phone<<endl;
      } while ((p->next) != NULL && (p = p->next)); //���жϺ��ƶ�����....
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
      if (!p || i > num) //�жϵ�num��Ԫ���Ƿ����
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

/********��ȻҲ������ǰ�Լ�д��������********/

Information** ListToArr(str_List *head);//����ת����

void Initialize ();//��ʼ���ļ�
void Inputfile();//������Ϣ
void ListToFile(str_List *);//��������ļ�
str_List * FileToList();//�ļ���ȡ����
void binary(Information_p * arr,str_List *head,int target);
/* ����ָ��pָ�����·���Ϸ��ʵ����һ����㲢����FALSE */
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

void Initialize (){//��ʼ���ļ�
      FILE *fp;//�ļ�ָ��
      int flag;
      fp= fopen(FILRADRESS,"rb");//��һ�ν��г���ʱ����
      if(fp==NULL){
            cout<<"�ļ���ʧ��"<<endl;
      }
      fclose(fp); //�����ļ���ر��ļ��ͺ�
      cout<<"1.���г�ʼ��"<<endl<<"2.�˳�";
      while(cin>>flag){
            if(flag==2){

                  return ;
            }
            if(flag==1){
                  Inputfile();
            }
            cout<<"1.���г�ʼ��"<<endl<<"2.�˳�";
      }

}
void Inputfile(){//��������
      Information x;
      FILE *fp;
      cout<<"����������"<<endl;
      cin>>x.name;
      cout<<"������QQ"<<endl;
      cin>>x.qq;
      cout<<"������绰"<<endl;
      cin>>x.phone;
      fp = fopen(FILRADRESS, "ab");
      if (fp == NULL) {
            printf("�ļ��򿪴���");
            return ;
      }
      fseek(fp,0,SEEK_END);//���ļ�ָ���Ƶ��ļ���β,��Ӳ������Ǽӵ����β.
      fwrite(&x,sizeof(Information),1,fp);//β���������.
      fclose(fp);
}//QAQ�ļ�ɾ��,�ļ�ɾ��,�ļ�ɾ��,����Ҫ����������洢,�⺯��д�ĺ������尡,������ȫû����Orz

str_List * FileToList(){
      Information x;
      FILE *fp;
      fp = fopen(FILRADRESS, "rb");//���ļ�
      int count,filesize;
      fseek(fp,0,SEEK_END);//�����ļ�ָ��ָ���ļ�ĩβ
      filesize = ftell(fp);//��ȡ��ǰ�ļ�ָ������ƫ�Ƴ���
      count = filesize/sizeof(Information);//ƫ�Ƴ��ȳ���λ����ƫ�������ǽṹ����Ŀ
      cout<<"�ṹ������"<<count<<"�ļ���С"<<filesize<<endl;
      rewind(fp);//��ԭ�ļ�ָ��λ������ʼ
      str_List *head;
      str_List *p;
      str_List *r;
      int i;
      head = (str_List *)malloc(sizeof(str_List));
      fread(&x, sizeof(Information), 1, fp);//��ȡһ�ε�λ���ȵ�����,���Ƕ�ȡ����һ���ṹ��.
      (head)->data=x;
      r = head;
      for (i = 1; i < count; i++) {//�������
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
      fp = fopen(FILRADRESS, "w");//����ļ�
      for(int i=1;i<=count;i++){
            GetElem(i, &x,head);
            fp = fopen(FILRADRESS, "ab");
            fseek(fp,0,SEEK_END);//���ļ�ָ���Ƶ��ļ���β,��Ӳ������Ǽӵ����β.
            fwrite(&x,sizeof(Information),1,fp);//β���������.
            fclose(fp);
      }
       ShowList(head);
}
Information_p * ListToArr(str_List *head){//����������
      int count;
      str_List* p;
      p=head;
      int *sum=&count;
      ListLength(head, sum);//��ȡ����
      void* tmp =malloc(sizeof(void *)*count);//�����ڴ�ռ�
      Information_p * a =(Information_p *) tmp;//ǿתΪ�ṹ��ָ��
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
      for (j = 0; j < count - 1; j++)//����
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
      while(low<=high)//���ֲ���
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
      cout<<"ʧ��";
      return;
}


BiTree * ListToTree(str_List *head){//��������
      int count;
      str_List* p;
      p=head;
      int *sum=&count;
      ListLength(head, sum);//��ȡ����
      BiTree *T = nullptr;

      for(int i=0;i<count;i++){
            InsertBST(T, &p->data);
            p=p->next;

      }
      return T;
}

/* �ݹ���Ҷ���������T���Ƿ����key, */
/* ָ��fָ��T��˫�ף����ʼ����ֵΪNULL */
/* �����ҳɹ�����ָ��pָ�������Ԫ�ؽ�㣬������TRUE */
/* ����ָ��pָ�����·���Ϸ��ʵ����һ����㲢����FALSE */
bool SearchBST(BiTree T, long int key, BiTree f, BiTree *p)
{
      if (!T)    /*  ���Ҳ��ɹ� */
      {
            *p = f;
            return false;
      }
      else if (key==T->data->phone) /*  ���ҳɹ� */
      {
            *p = T;
            return true;
      }
      else if (key<T->data->phone)
            return SearchBST(T->lchild, key, T, p);  /*  ���������м������� */
      else
            return SearchBST(T->rchild, key, T, p);  /*  ���������м������� */
}

bool InsertBST(BiTree *T, Information_p key)
{
      BiTree p,s;
      if (!SearchBST(*T, key->phone, NULL, &p)) /* ���Ҳ��ɹ� */
      {
            s = (BiTree)malloc(sizeof(BiTNode));
            s->data = key;
            s->lchild = s->rchild = NULL;
            if (!p)
                  *T = s;            /*  ����sΪ�µĸ���� */
            else if (key<p->data)
                  p->lchild = s;    /*  ����sΪ���� */
            else
                  p->rchild = s;  /*  ����sΪ�Һ��� */
            return true;
      }
      else
            return false;  /*  �������йؼ�����ͬ�Ľ�㣬���ٲ��� */
}
