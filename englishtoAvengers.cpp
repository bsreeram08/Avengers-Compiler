#include <bits/stdc++.h>
using namespace std;
int main()
{
    char s[100];
    char alpha[26] = {'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A'};
    string t;
    cin >> s;
    for (int iter = strlen(s) - 1; iter >= 0; iter--)
    {
        if (iter == strlen(s) - 1 && isalpha(s[iter]))
        {
            t.push_back(tolower(alpha[toupper(s[iter]) - 'A']));
        }
        else if (isalpha(s[iter]))
        {
            t.push_back(alpha[toupper(s[iter]) - 'A']);
        }
    }
    cout << t << endl;
}