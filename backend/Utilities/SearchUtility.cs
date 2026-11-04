namespace CharterBackend.Utilities
{
    public class SearchUtility
    {
        public int LevenshteinDistance(string WordOne, string WordTwo)
        {
            int lenFirst = WordOne.Length;
            int lenSecond = WordTwo.Length;

            int[,] table = new int[lenFirst + 1, lenSecond + 1];

            for (int i = 0; i < lenSecond + 1; i++)
            {
                table[0, i] = i;
            }
            for (int i = 0; i < lenFirst + 1; i++)
            {
                table[i, 0] = i;
            }

            int num;
            for (int i = 1; i < lenFirst + 1; i++)
            {
                for (int j = 1; j < lenSecond + 1; j++)
                {
                    if (WordOne.ElementAt(i - 1) != WordTwo.ElementAt(j - 1))
                    {
                        num = Math.Min(table[i, j - 1], Math.Min(table[i - 1, j], table[i - 1, j - 1]));
                        table[i, j] = num + 1;
                    }
                    else
                    {
                        table[i, j] = table[i - 1, j - 1];
                    }
                }
            }

            return table[lenFirst, lenSecond];
        }
    }
}
