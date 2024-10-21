import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

export default function TabTwoScreen() {
    const [displayValue, setDisplayValue] = useState('0');
    const [previousValue, setPreviousValue] = useState<string | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [isNextValue, setIsNextValue] = useState(false);

    const operatorOptions = ['/', 'x', '-', '+'];
    const numberOptions = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

    const handleNumberPress = (input: string) => {
        console.log('here')
        if (isNextValue) {
            setDisplayValue(input === '.' ? '0.' : input);
            setIsNextValue(false);
        } else {
            setDisplayValue((prev) => 
                prev === '0' && input !== '.' ? input : prev + input
            );
        }
    };

    const handleOperatorPress = (nextOperator: string) => {
        if (operator && previousValue !== null) {
            const result = calculate(previousValue, displayValue, operator);
            setPreviousValue(result.toString());
            setDisplayValue(result.toString());
        } else {
            setPreviousValue(displayValue);
        }
        setOperator(nextOperator);
        setIsNextValue(true);
    };

    const handleEqualsPress = () => {
        if (operator && previousValue !== null) {
            const result = calculate(previousValue, displayValue, operator);
            setDisplayValue(result.toString());
            setPreviousValue(null);
            setOperator(null);
            setIsNextValue(true);
        }
    };

    const handleClear = () => {
        setDisplayValue('0');
        setPreviousValue(null);
        setOperator(null);
        setIsNextValue(false);
    };

    const calculate = (firstValue: string, secondValue: string, operator: string): number | string => {
        const first = parseFloat(firstValue);
        const second = parseFloat(secondValue);
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case 'x':
                return first * second;
            case '/':
                return second !== 0 ? first / second : 'Error: division by zero';
            default:
                return parseFloat(displayValue);
        }
    };

    return (
        <View style={styles.container}>
            <Title>React Native Calculator</Title>

            <View style={styles.display}>
                <Text style={styles.displayText}>{displayValue}</Text>
            </View>

            <View style={styles.buttonContainer}>
                {numberOptions.map((number) => (
                    <Button
                        key={number}
                        style={styles.button}
                        mode="contained"
                        onPress={() => handleNumberPress(number)}
                    >
                        {number}
                    </Button>
                ))}
            </View>

            <View style={styles.operatorContainer}>
                {operatorOptions.map((operator) => (
                    <Button
                        key={operator}
                        style={styles.operator}
                        mode="contained"
                        onPress={() => handleOperatorPress(operator)}
                    >
                        {operator}
                    </Button>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    mode="outlined"
                    style={styles.button}
                    onPress={handleClear}
                >
                    C
                </Button>
                <Button
                    mode="outlined"
                    style={styles.button}
                    onPress={handleEqualsPress}
                >
                    =
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    display: {
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 20,
        marginBottom: 20,
        borderRadius: 5,
    },
    displayText: {
        fontSize: 48,
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        width: '30%',
        marginVertical: 10,
    },
    operatorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    operator: {
        width: '20%',
        marginVertical: 10,
    },
});