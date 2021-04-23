## Anotações importantes sobre a aula

### Minuto (1:09:00):
- Estender as props dentro de uma interface;

Ex: 
```tsx
  import { TouchableOppacityProps } from 'react-native'
  
  // Essa interface herdara todas as props dentro de TouchableOppacity
  interface ButtonProps extends TouchableOppacityProps {
    title: string;
  }

  export default function Button({ title, ...rest }: ButtonProps) {
    return (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        {title}
      >
        {title}
      </TouchableOpacity>
    );
  }
```

código: #missaoespacial