using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace Number_Game
{
    class Program
    {
        //static string[] messages = {"is your number {0}?","may its {0}.","your number shuld be {0}.","is this your number: {0}.","I think your number is: {0}","{0}?" };
        static string[] messages = { "is your number ", "may its ", "your number shuld be ", "is this your number ", "I think your number is ", "" };

        private static void GetNumber(out string number)
        {
            Random rand = new Random((int)(DateTime.Now.Ticks - 635839051000005200));
            int[] nums_array = new int[4];
            for (int i = 0; i < 4; i++)
            {
                nums_array[i] = rand.Next(1, 10);
                for (int j = i - 1; j >= 0; j--)
                    if (nums_array[i] == nums_array[j])
                        i--;
            }
            number = string.Empty + nums_array[3] + nums_array[0] + nums_array[1] + nums_array[2];
        }

        private static bool isValid(string number)
        {
            if (number.Length != 4)
                return false;
            for (int i = 0; i < number.Length; i++)
            {
                if (number[i] > '0' && number[i] < ':')
                {
                    for (int j = i + 1; j < number.Length; j++)
                        if (number[i] == number[j])
                            return false;
                }
                else
                    return false;
            }
            return true;
        }

        private static string CheckNumber(string first, string second)
        {
            string result = string.Empty;
            if (first.Length == second.Length)
            {
                for (int i = 0; i < first.Length; i++)
                {
                    if (first[i] == second[i])
                        result += "+";
                    else
                    {
                        for (int j = 0; j < second.Length; j++)
                            if (first[i] == second[j])
                                result += ">";//➡
                    }
                }
            }
            return result;
        }

        private static string GetExpecting(List<int> numbers, List<string> numbers_result, List<int> banned_numbers, List<int> OK_Number)
        {
            //remove numbers
            if (numbers.Count == 1)
            {
                if (numbers_result[0].Length == 4)
                {
                    for (int i = 1; i < 10; i++)
                        if (!numbers[0].ToString().Contains(i.ToString()))
                            banned_numbers.Add(int.Parse((numbers[0].ToString())[i].ToString()));
                        else
                            OK_Number.Add(int.Parse((numbers[0].ToString())[i].ToString()));
                }
                else if (numbers_result[0] == string.Empty)
                    for (int i = 0; i < numbers[0].ToString().Length; i++)
                        banned_numbers.Add(int.Parse((numbers[0].ToString())[i].ToString()));
                else
                {
                    string num = string.Empty;
                    for (int i = 1; i < 10; i++)
                        if ((!numbers[0].ToString().Contains(i.ToString())))
                        {
                            if (num.Length == 4)
                                break;
                            num += i;
                        }
                    numbers.Add(int.Parse(num));
                    return num;
                }
            }
            else if (numbers.Count == 2)
            {
                if ((numbers_result[1] + numbers_result[0]).Length == 3)
                {
                    for (int i = 1; i < 10; i++)
                    {
                        if (!(numbers[1].ToString() + numbers[0].ToString()).Contains(i.ToString()))
                        {
                            OK_Number.Add(i);
                            break;
                        }
                    }
                }
                if (numbers_result[1].Length == 4)
                {
                    for (int i = 1; i < 10; i++)
                        if (!numbers[1].ToString().Contains(i.ToString()))
                            banned_numbers.Add(i);
                        else
                            OK_Number.Add(i);
                }
                else if (numbers_result[1] == string.Empty)
                    for (int i = 0; i < numbers[1].ToString().Length; i++)
                        banned_numbers.Add(i);
            }

            List<int> possible_number = new List<int>();
            for (int i = 1234; i <= 9876; i++)
            {
                bool cont = false;
                var number = i.ToString();
                for (int k = 0; k < banned_numbers.Count; k++)
                    if (number.Contains(banned_numbers[k].ToString()))
                    {
                        cont = true;
                        break;
                    }
                for (int k = 0; k < OK_Number.Count; k++)
                    if (!number.Contains(OK_Number[k].ToString()))
                    {
                        cont = true;
                        break;
                    }
                if (cont)
                    continue;
                if (isValid(number))
                {
                    bool acc = true;
                    for (int j = 0; j < numbers.Count; j++)
                    {
                        if (CheckNumber(number, numbers[j].ToString()) != numbers_result[j])
                        {
                            acc = false;
                            break;
                        }
                    }
                    if (acc)
                        possible_number.Add(i);
                }
            }
            Random rand = new Random((int)(DateTime.Now.Ticks - 635839051001005010));
            if (possible_number.Count > 0)
            {
                int random = rand.Next(0, possible_number.Count);
                numbers.Add(possible_number[random]);
                return possible_number[random].ToString();
            }
            else
                return null;
        }

        private static bool CheckUserResult(string user_result)
        {
            if (user_result.Length > 4)
                return false;
            for (int i = 0; i < user_result.Length; i++)
                if (user_result[i] != '+' && user_result[i] != '>')
                    return false;
            return true;
        }

        private static void ConsoleWrite(string v1, string v2, string v3, ConsoleColor console_color)
        {
            Console.Write(v1);
            Console.ForegroundColor = console_color;
            Console.Write(v2);
            Console.ResetColor();
            Console.Write(v3);
        }

        static void Main(string[] args)
        {
            string number;
            Console.WriteLine("Four Plus design by: Dr.Mohammad");
            Console.WriteLine("Version: 0.1 beta");
            Console.WriteLine("Generate a number and save it.");
            GetNumber(out number);
            //Console.WriteLine(number);
            Console.WriteLine("Now let's see who can guess the other's number:");
            Console.BackgroundColor = ConsoleColor.DarkCyan;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("Let's get started.");
            Console.ResetColor();
            Console.WriteLine();
            bool game_over = false;
            List<int> numbers = new List<int>();
            List<string> numbers_result = new List<string>();
            List<int> banned_numbers = new List<int>();
            List<int> OK_numbers = new List<int>();
            int round_number = 0;

            while (!game_over)
            {
                round_number++;
                ConsoleWrite("", string.Format("Round {0}", round_number), "\n", ConsoleColor.DarkYellow);
                string user_number;
                while (!isValid(user_number = Console.ReadLine()))
                    ConsoleWrite("", "Invaled input try again.", "", ConsoleColor.Red);
                string result;
                Console.WriteLine(result = CheckNumber(user_number, number));
                if (result.Equals("++++"))
                {
                    ConsoleWrite("", "Congratulations you won.", "\n------------------------------------------------", ConsoleColor.Green);
                    game_over = true;
                    continue;
                }
                string exp = GetExpecting(numbers, numbers_result, banned_numbers, OK_numbers);
                if (exp != null)
                    ConsoleWrite(messages[new Random((int)(DateTime.Now.Ticks - 635839051000005200)).Next(0, messages.Length)], exp, "?\n", ConsoleColor.Yellow);
                else
                {
                    ConsoleWrite("", "Your answers is wrong", ", Please give me right result next time.", ConsoleColor.Red);
                    break;
                }
                string user_result = "????";
                while(!CheckUserResult(user_result))
                    user_result = Console.ReadLine();
                numbers_result.Add(user_result);
                if (user_result.Equals("++++"))
                {
                    ConsoleWrite("", "I won.\nYou are a loser", "\n", ConsoleColor.Magenta);
                    Console.WriteLine("------------------------------------------------");
                    game_over = true;
                }
                Console.WriteLine();
            }
            Console.ReadKey();
        }
    }
}