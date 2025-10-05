public class Main {
    private int sum(int n) {
        int res = 0;
        for (int i = 1; i <= n; i++) { // 1, 2, ..., n
            res += i;
        }
        return res;
    }
    public void main() {
        System.out.println(sum(100) + " should be 5050");
    }
    // 静态数组
    int[] arr = {1, 2, 3, 4, 5};
    // 动态数组
    
}
