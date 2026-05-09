#include <Drivers/Capacity/capacity.h>

#include <tim.h>
#include <Utils/logging.h>


#define CAPSENSE_GPIO_MODE             (0x00000003U)



void capacity_pin_set_to_output(GPIO_TypeDef *port, uint16_t pin)
{

	GPIO_InitTypeDef GPIO_Probe = {0};
	GPIO_Probe.Pin = pin;
	GPIO_Probe.Mode = GPIO_MODE_OUTPUT_PP;
	GPIO_Probe.Speed = GPIO_SPEED_FREQ_VERY_HIGH;


	HAL_GPIO_Init(port, &GPIO_Probe);
	HAL_GPIO_WritePin(port, pin, GPIO_PIN_SET);

}


void capacity_pin_set_to_input(GPIO_TypeDef *port, uint16_t pin)
{


	GPIO_InitTypeDef GPIO_Probe = {0};
	GPIO_Probe.Pin = pin;
	GPIO_Probe.Mode = GPIO_MODE_INPUT;
	GPIO_Probe.Speed = GPIO_SPEED_FREQ_VERY_HIGH;

    HAL_GPIO_Init(port, &GPIO_Probe);
    HAL_GPIO_WritePin(port, pin, GPIO_PIN_SET);

}


void capactiy_read_unoptimized(GPIO_TypeDef *port, uint16_t pin)
{
    HAL_StatusTypeDef status;

	__HAL_TIM_SET_COUNTER(&htim1, 0);

	capacity_pin_set_to_output(port, pin);

	HAL_Delay(5);

	status = HAL_TIM_Base_Start(&htim1);
	if(status != HAL_OK)
	{
		RTT_LOG("Failed starting timer: %d\n", status);
	}


	capacity_pin_set_to_input(port, pin);

	while(HAL_GPIO_ReadPin(port, pin));

	uint32_t cnt_lapsed = __HAL_TIM_GET_COUNTER(&htim1);

	status = HAL_TIM_Base_Stop(&htim1);
	if(status != HAL_OK)
	{
		RTT_LOG("Failed stopping timer: %d\n", status);
	}

	__HAL_TIM_SET_COUNTER(&htim1, 0);

	RTT_LOG("Capacity: Read: %ld (unoptimized)\n", cnt_lapsed);
}




void capacity_read()
{

    uint32_t tmp;

    GPIO_InitTypeDef GPIO_Probe_A = {0};
    GPIO_Probe_A.Pin = GPIO_PIN_2;
    GPIO_Probe_A.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_Probe_A.Speed = GPIO_SPEED_FREQ_VERY_HIGH;

    uint32_t clear_mask = ~(GPIO_MODER_MODE0 << (2 * GPIO_MODER_MODE1_Pos));
    uint32_t set_mask = ((GPIO_MODE_INPUT & CAPSENSE_GPIO_MODE) << (2 * GPIO_MODER_MODE1_Pos));

    __HAL_TIM_SET_COUNTER(&htim1, 0);

    HAL_GPIO_Init(GPIOA, &GPIO_Probe_A);
    HAL_GPIO_WritePin(GPIOA, GPIO_PIN_2, GPIO_PIN_SET);
    HAL_Delay(5);

    /// start of time critical sector
    __HAL_TIM_ENABLE(&htim1);

    tmp = GPIOA->MODER;
    tmp &= clear_mask;
    tmp |= set_mask;
    GPIOA->MODER = tmp;

	while(GPIOA->IDR & GPIO_PIN_2);
	uint32_t cnt_lapsed = __HAL_TIM_GET_COUNTER(&htim1);

	__HAL_TIM_DISABLE(&htim1);
	htim1.State = HAL_TIM_STATE_READY;
	__HAL_TIM_SET_COUNTER(&htim1, 0);

	RTT_LOG("Capacity: Read: %ld (default)\n", cnt_lapsed);

}

void capacity_read_irq()
{

    uint32_t tmp;

    GPIO_InitTypeDef GPIO_Probe_A = {0};
    GPIO_Probe_A.Pin = GPIO_PIN_2;
    GPIO_Probe_A.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_Probe_A.Speed = GPIO_SPEED_FREQ_VERY_HIGH;

    uint32_t clear_mask = ~(GPIO_MODER_MODE0 << (2 * GPIO_MODER_MODE1_Pos));
    uint32_t set_mask = ((GPIO_MODE_INPUT & CAPSENSE_GPIO_MODE) << (2 * GPIO_MODER_MODE1_Pos));

    __HAL_TIM_SET_COUNTER(&htim1, 0);

    HAL_GPIO_Init(GPIOA, &GPIO_Probe_A);
    HAL_GPIO_WritePin(GPIOA, GPIO_PIN_2, GPIO_PIN_SET);
    HAL_Delay(5);

    /// start of time critical sector
    __HAL_TIM_ENABLE(&htim1);

    tmp = GPIOA->MODER;
    tmp &= clear_mask;
    tmp |= set_mask;
    GPIOA->MODER = tmp;

	while(GPIOA->IDR & GPIO_PIN_2);
	uint32_t cnt_lapsed = __HAL_TIM_GET_COUNTER(&htim1);

	__HAL_TIM_DISABLE(&htim1);
	htim1.State = HAL_TIM_STATE_READY;
	__HAL_TIM_SET_COUNTER(&htim1, 0);

	RTT_LOG("Capacity: Read: %ld (IRQ)\n", cnt_lapsed);

}

