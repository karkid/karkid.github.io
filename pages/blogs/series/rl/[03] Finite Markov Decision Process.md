# Chapter 3: Finite Markov Decision Processes (MDPs)

## Why This Chapter Matters

Chapter 3 is where Reinforcement Learning (RL) becomes a **true framework for sequential decision-making**.

In Chapter 2, we had:

* Actions
* Rewards

But we lacked:

* A notion of *state*
* The idea that actions affect the *future*

Now, Chapter 3 introduces:

* States
* State transitions
* Delayed consequences
* The Markov property
* Bellman equations

👉 This is the foundation of almost all classical RL methods. 

If Chapter 2 was a toy model,
**Chapter 3 is the first real mathematical model of RL.**

---

## Intuition: Agent in a World

Think of an agent interacting with an environment:

At each step:

1. The agent is in a **state**
2. It chooses an **action**
3. The environment transitions to a **new state**
4. The agent receives a **reward**

### Example: Gridworld

* State → robot’s position
* Action → up / down / left / right
* Reward → `-1` per step, `+10` at goal

💡 Key Idea:

> The value of an action depends on the current state.

In bandits:

* Action = fixed value

In MDPs:

* Same action can be good or bad depending on the state
* state dependent decision making

---

## Formal Definition of an MDP

A finite MDP consists of:

* A finite set of states **S**
* A set of actions **A(s)** for each state
* Transition probabilities
* Reward function
* Discount factor **γ**

### Dynamics of the Environment

The environment is defined by:

$$
p(s', r | s, a)
$$

Meaning:

> Probability of moving to state `s'` and receiving reward `r`, given state `s` and action `a`

---

## The Markov Property

This is the core idea.

> The future depends only on the present state, not on past history.

$$
P(S_{t+1}, R_{t+1} | S_t, A_t, history)
=
P(S_{t+1}, R_{t+1} | S_t, A_t)
$$

💡 Important:

* This does not mean the past is irrelevant in reality. It means the state has been defined richly enough to summarize the relevant past.
* The state must contain **all relevant information from the past**

---

## Policy

A policy defines behavior:

$$
π(a | s) = P(A_t = a | S_t = s)
$$

👉 It tells us what action to take in each state.

---

## Return

The total future reward is:

$$
G_t = R_{t+1} + γR_{t+2} + γ²R_{t+3} + ...
$$

Recursive form:

$$
G_t = R_{t+1} + γG_{t+1}
$$

This recursion is fundamental to RL.

---

## Value Functions

### State-Value Function

$$
v_π(s) = E_π [G_t | S_t = s]
$$

👉 Expected return starting from state `s`

### Action-Value Function

$$
q_π(s, a) = E_π [G_t | S_t = s, A_t = a]
$$

👉 Expected return after taking action `a` in state `s`

---

## Bellman Expectation Equation

This is one of the most important results.

$$
v_π(s) = E_π [R_{t+1} + γ v_π(S_{t+1}) | S_t = s]
$$

Expanded:
$$
v_{\pi}(s) =
\sum_a \pi(a \mid s)
\sum_{s', r} p(s', r \mid s, a) \left[ r + \gamma v_{\pi}(s') \right]
$$

Where,
- $s$: current state
- $a$: action chosen in state $s$
- $\pi(a \mid s)$: probability of choosing action $a$ in state $s$
- $s'$: next state
- $r$: reward received
- $p(s', r \mid s, a)$: probability of transitioning to $s'$ and receiving reward $r$
- $v_{\pi}(s')$: value of the next state
- $\gamma$: discount factor


💡 Intuition:

> Value = expected immediate reward + discounted future value

---

## Action-Value Bellman Equation

$$
q_{\pi}(s, a) =
\sum_{s', r} p(s', r \mid s, a)
\left[ r + \gamma \sum_{a'} \pi(a' \mid s') \, q_{\pi}(s', a') \right]
$$

---

## Optimal Value Functions

We now care about the *best possible behavior*.

### Optimal State Value

$$
v*(s) = max_π v_π(s)
$$

### Optimal Action Value

$$
q*(s, a) = max_π q_π(s, a)
$$

---

## Bellman Optimality Equations

### For State Value

$$
v^*(s) =
\max_a \sum_{s', r} p(s', r \mid s, a)
\left[ r + \gamma v^*(s') \right]
$$

### For Action Value

$$
q^*(s, a) =
\sum_{s', r} p(s', r \mid s, a)
\left[ r + \gamma \max_{a'} q^*(s', a') \right]
$$

💡 Key Shift:

* Expectation → **Prediction**
* Max → **Control**

---

## Example: Simple MDP

States:

* `s₁` (start)
* `s₂` (terminal)

Actions at `s₁`:

* Left → reward `+1`, terminate
* Right → reward `0`, stay in `s₁`

Policy:

* Left: 0.5
* Right: 0.5

Discount: γ = 0.9

### Solve:

$$
v_π(s₁) = 0.5[1 + 0.9×0] + 0.5[0 + 0.9 v_π(s₁)]
$$

$$
v_π(s₁) = 0.5 + 0.45 v_π(s₁)
$$

$$
0.55 v_π(s₁) = 0.5
$$

$$
v_π(s₁) ≈ 0.909
$$

---

## MDPs vs Bandits

| Feature         | Bandits | MDPs |
| --------------- | ------- | ---- |
| States          | ❌       | ✅    |
| Transitions     | ❌       | ✅    |
| Delayed rewards | ❌       | ✅    |
| Planning needed | ❌       | ✅    |

👉 Bandits: *Which action is best?*
👉 MDPs: *What should I do given this situation?*

---

## Prediction vs Control

Two key problems:

* **Prediction** → Evaluate a policy
* **Control** → Find the optimal policy

---

## Episodic vs Continuing Tasks

### Episodic

* Has an end
* Example: games, tasks

### Continuing

* No terminal state
* Example: servers, robots, systems

👉 Discount factor is crucial here.

---

## Common Confusions

❌ State = observation
✔️ State must encode all relevant history

❌ Markov = no memory
✔️ State *contains* the memory

❌ Value = immediate reward
✔️ Value = long-term return

❌ Bellman = algorithm
✔️ Bellman = relationship (algorithms come later)

---

## Final Insight

> Reinforcement Learning is no longer about choosing actions —
> it is about choosing actions **that shape the future**.

That shift is what makes MDPs powerful.

## Summary

```mermaid
---
mindmap
  root((Finite MDPs))
    ((Environment Structure))
      [States — S]
      [Actions — A]
      [Rewards — R]
      [Transitions — p〈s′ r ∣ s a〉]
    ((Markov Property))
      Present state summarizes past
    ((Policy — π〈a∣s〉))
      [Action choice rule]
    ((Value Functions))
      [v_π〈s〉 — State Value]
      [q_π〈s a〉 — Action Value]
      ((The Connection))
        [V is the weighted sum of Q]
        [Q is the lookahead of V]
    ((Bellman Equations))
      [Expectation — Current plus Future]
      [Optimality — Current plus Max Future]
    ((Two Problem Types))
      [Prediction — Evaluate a policy]
      [Control — Find the best policy]
    ((Task Types))
      [Episodic — Has terminal state]
      [Continuing — Infinite horizon]
```

## Notes

### (Bandit vs MDP)

    - Bandit → action → reward (no future consequences)
    - MDP → action → reward + next state → affects future decisions

👉 Key idea: MDP = decisions that shape the future

### (Meaning of $𝑝(𝑠′,𝑟∣𝑠,𝑎)$)

    - probability of transition from s to s' and getting reward

### Markov Property

    - current state summarizes the past

### Why is value NOT just immediate reward?

Intuition: 

Because actions affect future states, and future states produce future rewards.

Example

Imagine:

Action A → gives reward +1 now, but leads to a bad state
Action B → gives reward 0 now, but leads to a state that gives +10 later

If you only look at immediate reward:
→ you pick A (wrong)

If you consider long-term return:
→ you pick B (correct)

Key insight

    Value = Immediate reward + Future consequences

That’s the whole reason RL exists.

### Difference between $𝑣_𝜋(𝑠)$ and $𝑣_∗(𝑠)$

This is a foundational distinction.

$𝑣_𝜋(𝑠)$ : Value of state under a specific policy 𝜋

    “How good is this state if I follow THIS behavior?”

$𝑣_∗(𝑠)$: Optimal value

$$
𝑣_∗(𝑠) = \max_𝜋 𝑣_𝜋(𝑠)
$$
    “How good COULD this state be if I behaved optimally?”

Intuition

$𝑣_𝜋(𝑠)$ = how good my current strategy is

$𝑣_∗(𝑠)$ = how good the best possible strategy is
Why this matters

RL is about:

estimate $v_π$  → improve policy → get closer to $v_*$

This loop appears everywhere later.

### Bellman Equation

This is the single most important idea in RL.

Intuition in one sentence:

The value of a state equals the immediate reward plus the value of the next state.

More precisely:

$$
𝑣_𝜋(𝑠) = 𝐸[𝑅_𝑡 + 1 + 𝛾 𝑣_𝜋 (𝑆_𝑡 + 1 ) ]
$$

Deep intuition

    You don’t need to think about the whole future at once.

Instead:

- break the problem into:
    - what happens now
    - plus what happens later

This recursive structure is what makes RL solvable.

Analogy

Think of life decisions:

    “My future success = what I gain today + how good my future situation becomes”

Bellman equation = formal version of that idea.
