#include <stdio.h>
#include <stdlib.h>

// 打印数组元素的地址
void print_arr_address(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("Address of arr[%d] = %p byte = %lu\n", i, (void*)&arr[i], (uintptr_t)&arr[i] * 8);
    }
}
// 插入元素到数组中
int* insert_arr(int *arr, int size, int index, int value) {
    // 分配新的内存空间
    int *new_arr = (int*)malloc((size + 1) * sizeof(int));
    if (new_arr == NULL) {
        printf("Memory allocation failed\n");
        exit(1);
    }

    // 复制元素到新数组
    for (int i = 0, j = 0; i < size + 1; i++) {
        if (i == index) {
            new_arr[i] = value;
        } else {
            new_arr[i] = arr[j++];
        }
    }

    // 释放旧数组的内存
    free(arr);

    return new_arr;
}
int array_demo(){
    // 初始化数组
    int size = 3;
    int *arr = (int*)malloc(size * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;

    // 打印初始数组元素的地址
    print_arr_address(arr, size);

    // 插入元素
    int index = 1;
    int value = 4;
    arr = insert_arr(arr, size, index, value);
    size++;

    // 打印插入元素后的数组
    printf("Array after insertion: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // 打印插入元素后的数组元素的地址
    print_arr_address(arr, size);

    // 释放内存
    free(arr);
    printf("-------------------------\n");
    return 0;
}
// 定义链表节点结构
typedef struct Node {
    int data;
    struct Node* next;
} Node;

// 打印链表节点的地址
void print_linked_list_id(Node* head) {
    Node* current = head;
    int index = 0;
    while (current != NULL) {
        printf("Address of node %d = %p byte = %lu\n", index++, (void*)current, (uintptr_t)current * 8);
        current = current->next;
    }
}

// 插入元素到链表中
Node* insert_element(Node* head, int index, int value) {
    Node* new_node = (Node*)malloc(sizeof(Node));
    if (new_node == NULL) {
        printf("Memory allocation failed\n");
        exit(1);
    }
    new_node->data = value;
    new_node->next = NULL;

    if (index == 0) {
        new_node->next = head;
        return new_node;
    }

    Node* current = head;
    for (int i = 0; i < index - 1 && current != NULL; i++) {
        current = current->next;
    }

    if (current == NULL) {
        printf("Index out of bounds\n");
        free(new_node);
        return head;
    }

    new_node->next = current->next;
    current->next = new_node;

    return head;
}

// 打印链表
void print_linked_list(Node* head) {
    Node* current = head;
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\n");
}

// 释放链表内存
void free_linked_list(Node* head) {
    Node* current = head;
    Node* next;
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
}

void linked_list_demo() {
    // 初始化链表
    Node* head = NULL;
    head = insert_element(head, 0, 1);
    head = insert_element(head, 1, 2);
    head = insert_element(head, 2, 3);

    // 打印初始链表节点的地址
    print_linked_list_id(head);

    // 插入元素
    head = insert_element(head, 1, 4);

    // 打印插入元素后的链表
    printf("List after insertion: ");
    print_linked_list(head);

    // 打印插入元素后的链表节点的地址
    print_linked_list_id(head);

    // 释放内存
    free_linked_list(head);
}

int main() {
    array_demo();
    linked_list_demo();
    return 0;
}